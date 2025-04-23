import { DataSetRaw } from '@/types/dataSet';
import ChartPageView from '@/components/ChartPageView';
import getDataSets from '@/utils/get-datasets';
import getData from '@/utils/get-data';
import getOrCreateDataset from '@/utils/update-dataset';

type ChartPageProps = Promise<{ name: string }>;

/**
 *  Get dataset item by name
 */
const getDataSetItem = (dataSetList: DataSetRaw[], name: string) => {
  return dataSetList.find(dataSet => dataSet.name === name);
};

/**
 * Render Chart page where users may view data or create a new chart View
 */
export default async function ChartPage({ params }: { params: ChartPageProps }) {
  const { name } = await params;
  // need to clean this up - shouldn't have to get datasets every time
  // can get dataset from db by url if it exists
  const dataSetList = await getDataSets();
  const dataSetListItem = getDataSetItem(dataSetList, name);
  const dataSetItem = await getOrCreateDataset(dataSetListItem ?? name);

  const url = dataSetItem ? dataSetItem.downloadUrl : '';

  const { rows, columns } = await getData(name, url);

  return (
    <ChartPageView dataSetItem={dataSetItem} columns={dataSetItem.columns ?? columns} rows={rows} />
  );
}
