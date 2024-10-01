'use server';
import { DataSet, Resource } from '@/types/dataSet';

// filter for JSON dataSets for now
function filterJsonResource(dataSet: DataSet) {
  return dataSet?.resources?.find((item: Resource) => item.format === 'JSON');
}

/** Get catalog results list, filtering for JSON datasets */
export default async function getDataSets() {
  const url = 'https://catalog.data.gov/api/3/action/package_search';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.result.results.filter(filterJsonResource);
  } catch (error) {
    console.log(error);
  }
}
