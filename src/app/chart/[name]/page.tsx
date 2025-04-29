import ChartPageView from '@/components/ChartPageView';
import getData from '@/utils/get-data';
import getOrCreateDataset from '@/utils/update-dataset';

type ChartPageProps = Promise<{ name: string }>;

/**
 * Render Chart page where users may view data or create a new chart View
 */
export default async function ChartPage({ params }: { params: ChartPageProps }) {
  const { name } = await params;
  const dataSetItem = await getOrCreateDataset(name);
  const url = dataSetItem ? dataSetItem.downloadUrl : '';
  const { rows, columns } = await getData(name, url);

  return (
    <ChartPageView dataSetItem={dataSetItem} columns={dataSetItem.columns ?? columns} rows={rows} />
  );
}
