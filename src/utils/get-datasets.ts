'use client';
import { DataSet, Resource } from '@/types/dataSet';

export default async function getDataSets() {
  const url = '/catalog/api/3/action/package_search';
  try {
    const response = await fetch(url);
    const data = await response.json();
    // filter for JSON dataSets for now
    return data.result.results.filter((dataSet: DataSet) =>
      dataSet?.resources.find((item: Resource) => item.format === 'JSON'),
    );
  } catch (error) {
    console.log(error);
  }
}
