import { DataSet } from '@/types/dataSet';
import ChartPageView from '../../../components/ChartPageView';
import getDataSets from '@/utils/get-datasets';
import getData from '@/utils/get-data';
import formatTabularData from '@/utils/formatTabularData';
import getOrCreateDataset from '@/utils/update-dataview';

/**
 *  Get dataset item by name
 */
const getDataSetItem = (dataSetList: DataSetRaw[], name: string) => {
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
  // need to clean this up - shouldn't have to get datasets every time
  const dataSetList = await getDataSets();
  const dataSetListItem = getDataSetItem(dataSetList, name);
  const dataSetItem = await getOrCreateDataset(dataSetListItem);
  console.log({ dataSetItem });

  const dataSetId = dataSetItem ? dataSetItem.id : '';
  // const dataSetResourceUrl = getDataSetResourceUrl(dataSetItem);
  // const url = dataSetResourceUrl ? dataSetResourceUrl.href : null;
  const url = dataSetItem ? dataSetItem.downloadUrl : '';

  const unformattedData = await getData(name, url, dataSetId);
  const { filteredColumns: columns, filteredRows: rows } = formatTabularData(unformattedData);

  const chartTitle = dataSetItem ? dataSetItem.title : '';
  const description = unformattedData?.meta?.view?.description || 'N/A';

  return (
    <ChartPageView
      dataSetId={dataSetId}
      // metadata={dataset} expected usage
      chartTitle={chartTitle}
      description={description}
      columns={columns}
      rows={rows}
    />
  );
}
