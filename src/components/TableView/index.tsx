import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

type TableViewProps = {
  viewId: string;
  columns: GridColDef[];
  rows: GridValidRowModel[];
  loading: boolean;
};

/**
 * Render tabular View for dataset
 */
export default function TableView({ viewId, columns, rows, loading }: TableViewProps) {
  return (
    <DataGrid
      key={`data-grid-${viewId}`}
      rows={rows}
      columns={columns}
      loading={loading}
      slots={{
        loadingOverlay: {
          variant: 'skeleton',
          noRowsVariant: 'skeleton',
        },
      }}
    />
  );
}
