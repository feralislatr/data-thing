'use server';
import { DataSetRaw, Resource } from '@/types/dataSet';

// filter for CSV Datasets
function filterCsvResource(dataSet: DataSetRaw) {
  return dataSet?.resources?.find((item: Resource) => item.format === 'CSV');
}

/** Get catalog results list, filtering for CSV datasets */
export default async function getDataSets() {
  const url = 'https://catalog.data.gov/api/3/action/package_search';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.result.results.filter(filterCsvResource);
  } catch (error) {
    console.log(error);
  }
}
