'use server';
import db from '@/db';
import { DataSetRaw, DataSet } from '@/types/dataSet';
import { getShortcode } from './string-util';
import getDataSets from './get-datasets';

/**
 * Get dataset from database or create a new dataset record
 */
export default async function getOrCreateDataset(datasetName: string) {
  const shortCode = getShortcode(datasetName);

  const datasetList = await db.collection('dataset_catalog');

  // if collection exists, return from db
  const record = await datasetList.findOne({ name: shortCode });
  if (record) {
    return record as unknown as DataSet;
  } else {
    const dataSetList = await getDataSets();
    const {
      id,
      title,
      notes,
      metadata_modified,
      maintainer,
      organization,
      resources,
      extras,
    }: DataSetRaw = dataSetList.find((dataSet: DataSetRaw) => dataSet.name === datasetName);

    let tempRecord: DataSet = {
      id,
      name: shortCode,
      title,
      description: notes,
      metadata_modified_date: metadata_modified,
      maintainer,
      orgTitle: organization?.title ?? '',
      category: extras.find(item => item.key === 'theme')?.value ?? '',
      downloadUrl: new URL(resources.find(item => item.format === 'CSV')?.url ?? '').href,
      columns: null,
    };
    await datasetList.insertOne(tempRecord);
    return tempRecord;
  }
}
