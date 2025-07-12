import ChartPageView from '@/components/ChartPageView'

import getData from '@/utils/get-data'
import getOrCreateDataset from '@/utils/update-dataset'

type ChartPageProps = Promise<{ name: string }>

/**
 * Render Chart page where users may view data or create a new chart View
 */
export default async function ChartPage({
  params,
  searchParams,
}: {
  params: ChartPageProps
  searchParams: { page?: string; pageSize?: string }
}) {
  const { name } = await params
  const { page: pageParam, pageSize: pageSizeParam } = await searchParams
  const page = Number(pageParam) || 1
  const pageSize = Number(pageSizeParam) || 100

  const dataSetItem = await getOrCreateDataset(name)
  const url = dataSetItem ? dataSetItem.downloadUrl : ''
  const { rows, columns, totalCount } = await getData(name, url, page, pageSize)

  return (
    <ChartPageView
      page={page}
      pageSize={pageSize}
      dataSetItem={dataSetItem}
      columns={dataSetItem.columns ?? columns}
      rows={rows}
      totalCount={totalCount}
    />
  )
}
