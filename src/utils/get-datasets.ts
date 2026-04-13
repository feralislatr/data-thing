'use server'

import db from '@/db'

import { DataSetRaw, Resource } from '@/types/dataSet'

import { formatDataset } from '@/utils/formatData'

// filter for CSV Datasets
function filterCsvResource(dataSet: DataSetRaw) {
  return dataSet?.resources?.find((item: Resource) => item.format === 'CSV')
}

/** Get catalog results list, filtering for CSV datasets */
// need option to check db only
export default async function getDataSets() {
  const url = 'https://catalog.data.gov/api/3/action/package_search'

  try {
    // get datasets from data.gov
    const response = await fetch(url)
    const data = await response.json()
    const filteredResults = data.result.results.filter(filterCsvResource).map(formatDataset)

    // get datasets from db
    const cursor = db.collection('dataset_catalog').find({})
    const dbDatasetList = await cursor.toArray()

    // filter out existing datasets from data.gov results
    const newDatasets = filteredResults.filter(
      (dataset: DataSetRaw) => !dbDatasetList.map(dataset => dataset.id).includes(dataset.id),
    )

    // update db with any new datasets from data.gov
    if (newDatasets.length > 0) {
      await db.collection('dataset_catalog').insertMany(newDatasets)
    }

    return [...newDatasets, ...dbDatasetList]
  } catch (error) {
    console.log(error)
    return []
  }
}
