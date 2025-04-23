'use server';

import db from '@/db';
import { formatTabularDataCsv } from './formatTabularData';

/** Download dataset from given resource url */
export default async function getData(name: string, url: string | null) {
  if (!url) return { rows: [], columns: [] };

  const shortCode = name.replace(/-/g, '_').slice(0, 48);

  const collections = await db.listCollections({ nameOnly: true });
  // if collection exists, return from db
  if (collections.includes(shortCode)) {
    const cursor = await db.collection(shortCode).find({});
    const rows = await cursor.toArray();
    return { rows: rows, columns: [] };
  }

  const data = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
  })
    .then(res => res.text())
    .then(csv => formatTabularDataCsv(csv))
    .catch(err => console.log(err));

  if (data) {
    // update dataset record with column info
    const datasetList = await db.collection('dataset_catalog');
    const record = await datasetList.findOne({ name: shortCode });
    if (record) {
      await datasetList.updateOne({ name: shortCode }, { $set: { columns: data.columns } }); // review this
    }
    const collection = await db.createCollection(shortCode);
    // 413 request entity too large -- need to batch requests -> refactor to csv
    collection.insertMany(data.rows);
  } else {
    return { rows: [], columns: [] };
  }

  return { rows: data.rows, columns: data.columns };
}
