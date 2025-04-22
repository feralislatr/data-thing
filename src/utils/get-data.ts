'use server';

import db from '@/db';

/** Download dataset from given resource url */
export default async function getData(name: string, url: string | null, dataSetId: string | null) {
  if (!url) return null;

  const shortCode = name.replace(/-/g, '_').slice(0, 48);

  // try {
  //   await db.info();
  // } catch (error) {
  //   console.error('Error connecting to AstraDB:', error);
  // }

  const collections = await db.listCollections({ nameOnly: true });
  console.log('collections', collections);
  // if collection exists, return from db
  if (collections.includes(shortCode)) {
    return db.collection(shortCode);
  }

  const data = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
  })
    .then(res => res.json())
    .catch(err => console.log(err));

  const collection = await db.createCollection(shortCode);
  // 413 request entity too large -- need to batch requests -> refactor to csv
  collection.insertMany(data);

  // will ultimately change this return
  return data;
}
