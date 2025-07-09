'use server';
import db from '@/db';
import { DataSetRaw, DataSet } from '@/types/dataSet';
import { getShortcode } from './string-util';
import getDataSets from './get-datasets';
import { formatDataset } from './formatData';

/**
 * Get dataset from database or create a new dataset record
 */
export default async function getOrCreateDataset(datasetName: string) {
  const shortCode = getShortcode(datasetName);
  const dbDatasetList = db.collection('dataset_catalog');
  // if collection exists, return from db
  const record = await dbDatasetList.findOne({ name: shortCode });
  if (record) {
    return record as unknown as DataSet;
  } else {
    const datasetList = await getDataSets();
    const datasetRecord = datasetList.find((dataSet: DataSetRaw) => dataSet.name === datasetName);

    if (!datasetRecord) {
      throw new Error(`Dataset "${datasetName}" not found in catalog`);
    }

    const tempRecord = formatDataset(datasetRecord);

    await dbDatasetList.insertOne(formatDataset(datasetRecord));
    return tempRecord;
  }
}
