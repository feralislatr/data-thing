import { memo } from 'react'

import type { GridColDef, GridPaginationModel, GridValidRowModel } from '@mui/x-data-grid'

import { ViewConfig } from '@/types/viewConfig'

import BarChartView from '@/components/BarChartView'
import TableView from '@/components/TableView'

type DisplayChartProps = {
  activeView: ViewConfig
  filteredColumns: GridColDef[]
  filteredRows: GridValidRowModel[]
  loading: boolean
  totalCount: number
  paginationModel: GridPaginationModel
  onPaginationModelChange: (model: GridPaginationModel) => void
}

/**
 * Render active Chart
 * Memoized to prevent expensive rerender
 */
const DisplayChart = memo(function DisplayChart({
  activeView,
  filteredColumns,
  filteredRows,
  loading,
  totalCount,
  paginationModel,
  onPaginationModelChange,
}: DisplayChartProps) {
  return {
    bar: (
      <BarChartView
        viewId={activeView.value}
        columns={filteredColumns}
        rows={filteredRows}
        configData={activeView}
      />
    ),
    table: (
      <TableView
        viewId={activeView.value}
        columns={filteredColumns}
        rows={filteredRows}
        loading={loading}
        totalCount={totalCount}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
      />
    ),
    default: <div>View not supported</div>,
  }[activeView.type]
})

export default DisplayChart
