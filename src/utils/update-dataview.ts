'use server';
import db from '@/db';
import { DataSetRaw, DataSet } from '@/types/dataSet';

export default async function getOrCreateDataset(query: DataSetRaw | string) {
  const { id, name, title, notes, metadata_modified, maintainer, organization, resources, extras } =
    typeof query === 'string' ? ({ name: query } as DataSetRaw) : query;
  // try {
  const shortCode = name.replace(/-/g, '_').slice(0, 48);

  const datasetList = await db.collection('dataset_catalog');

  // if collection exists, return from db
  const record = await datasetList.findOne({ name: shortCode });

  if (record) {
    // what format are records returned in?
    console.log({ record });
    return record as unknown as DataSet;
  } else {
    let tempRecord = {
      id,
      name: shortCode,
      title,
      description: notes,
      metadata_modified_date: metadata_modified,
      maintainer,
      orgTitle: organization.title,
      category: extras.find(item => item.key === 'theme')?.value ?? '',
      downloadUrl: new URL(resources.find(item => item.format === 'CSV')?.url ?? '').href,
    };
    await datasetList.insertOne(tempRecord);
    return tempRecord;
  }

  //   // Get and return the collection
  //   return record
  // } catch (error) {
  //   console.error('Error getting/creating collection:', error);
  //   throw error;
  // }
}
