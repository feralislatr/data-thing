import { memo } from 'react';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { ViewConfig } from '@/types/viewConfig';
import BarChartView from '@/components/BarChartView';
import TableView from '@/components/TableView';

type DisplayChartProps = {
  activeView: ViewConfig;
  filteredColumns: GridColDef[];
  filteredRows: GridValidRowModel[];
  loading: boolean;
};

/**
 * Render active Chart
 * Memoized to prevent expensive rerender
 */
const DisplayChart = memo(function DisplayChart({
  activeView,
  filteredColumns,
  filteredRows,
  loading,
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
      />
    ),
    default: <div>View not supported</div>,
  }[activeView.type];
});

export default DisplayChart;
