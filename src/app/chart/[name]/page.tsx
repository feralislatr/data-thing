import { DataSet } from '@/types/dataSet';
import ChartPageView from '../../../components/ChartPageView';
import getDataSets from '@/utils/get-datasets';
import getData from '@/utils/get-data';
import formatTabularData from '@/utils/formatTabularData';

/**
 *  Get dataset item by name
 */
const getDataSetItem = (dataSetList: DataSet[], name: string) => {
  return dataSetList.find(dataSet => dataSet.name === name);
};

// change to csv
/**
 *  Get download URL of the dataset item if it is in JSON format
 */
const getDataSetResourceUrl = (dataSetItem?: DataSet) => {
  if (!dataSetItem) return null;
  const resource = dataSetItem.resources.find(({ format }) => format === 'JSON');
  return resource ? new URL(resource.url) : null;
};

type Params = Promise<{ name: string }>;

/**
 * Render Chart page where users may view data or create a new chart View
 */
export default async function ChartPage({ params }: { params: Params }) {
  const { name } = await params;
  const dataSetList = await getDataSets();
  const dataSetItem = getDataSetItem(dataSetList, name);
  const dataSetId = dataSetItem ? dataSetItem.id : '';
  const dataSetResourceUrl = getDataSetResourceUrl(dataSetItem);
  const url = dataSetResourceUrl ? dataSetResourceUrl.href : null;

  const unformattedData = await getData(name, url, dataSetId);
  const { filteredColumns: columns, filteredRows: rows } = formatTabularData(unformattedData);

  const chartTitle = dataSetItem ? dataSetItem.title : '';
  const description = unformattedData?.meta?.view?.description || 'N/A';

  return (
    <ChartPageView
      dataSetId={dataSetId}
      // metadata={dataView} expected usage
      chartTitle={chartTitle}
      description={description}
      columns={columns}
      rows={rows}
    />
  );
}
