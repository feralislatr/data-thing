'use server';

import db from '@/db';
import { formatTabularDataCsv } from './formatTabularData';
import { getShortcode } from './string-util';
import { GridValidRowModel } from '@mui/x-data-grid';

/** Download dataset from given resource url */
export default async function getData(name: string, url: string | null, page: number = 1, pageSize: number = 100) {
  if (!url) return { rows: [], columns: [], totalCount: 0 };

  const shortCode = getShortcode(name);

  const collections = await db.listCollections({ nameOnly: true });

  if (collections.includes(shortCode)) {
    let cursor = null;
    const collection = db.collection(shortCode);
    const totalCount = await collection.estimatedDocumentCount();
    if (totalCount <= page * pageSize) {
      cursor = await collection.find({});
    } else {
      // Find documents with a sequential id for a given page and pageSize.
      // (workaround for paginating large datasets within the limits of the free tier)
      cursor = await collection.find({ id: { $gte: page * pageSize, $lt: (page + 1) * pageSize } })
    }

    const rows = await cursor.toArray()
    return { rows, columns: [], totalCount };
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    });

    const csv = await response.text();
    const { columns, processBatch } = formatTabularDataCsv(csv);

    if (!processBatch) {
      console.error('Failed to initialize data processing');
      return { rows: [], columns: [], totalCount: 0 };
    }

    // update dataset record with column info
    const datasetList = await db.collection('dataset_catalog');
    const record = await datasetList.findOne({ name: shortCode });
    if (record && !record.columns) {
      await datasetList.updateOne({ name: shortCode }, { $set: { columns } });
    }

    const collection = await db.createCollection(shortCode);
    const batchSize = 100;
    let processedRows = 0;

    // process and insert batches
    let firstBatch: GridValidRowModel[] = [];
    for (const batch of processBatch(batchSize)) {
      await collection.insertMany(batch);
      processedRows += batch.length;
      if (firstBatch.length === 0) {
        firstBatch = batch;
      }
    }

    return { rows: firstBatch, columns, totalCount: processedRows };
  } catch (err) {
    console.error('Error processing data:', err);
    return { rows: [], columns: [], totalCount: 0 };
  }
}
