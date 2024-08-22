'use client';
import { useDataSetData, useDataSetDetails, useDataSetList } from '@/hooks/use-datasets';
import { DataSet } from '@/types/dataSet';
import ChartPageView from '../../../components/ChartPageView';

/**
 *  Get dataset item by name
 */
const getDataSetItem = (dataSetList: DataSet[], name: string) => {
  return dataSetList.find(dataSet => dataSet.name === name);
};

/**
 *  Get download URL of the dataset item if it is in JSON format
 */
const getDataSetResourceUrl = (dataSetItem?: DataSet) => {
  if (!dataSetItem) return null;
  const resource = dataSetItem.resources.find(({ format }) => format === 'JSON');
  if (!resource || !URL.canParse(resource.url)) return null;
  return resource.url;
};

/**
 * Render Chart page where users may view data or create a new chart View
 */
export default function ChartPage({ params }: { params: { name: string } }) {
  const { dataSetList } = useDataSetList();
  const dataSetItem = getDataSetItem(dataSetList, params.name);
  const dataSetResourceUrl = getDataSetResourceUrl(dataSetItem);

  const {
    filteredColumns: columns,
    filteredRows: rows,
    isLoading,
  } = useDataSetData(dataSetResourceUrl, params.name);

  const { description } = useDataSetDetails(dataSetResourceUrl, params.name);

  const chartTitle = dataSetItem ? dataSetItem.title : '';

  return (
    <ChartPageView
      chartTitle={chartTitle}
      description={description}
      columns={columns}
      rows={rows}
      isLoading={isLoading}
    />
  );
}
