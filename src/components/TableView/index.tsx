import { DataGrid, GridColDef, GridValidRowModel, GridPaginationModel } from '@mui/x-data-grid';

type TableViewProps = {
  viewId: string;
  columns: GridColDef[];
  rows: GridValidRowModel[];
  loading: boolean;
  totalCount: number;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  paginationModel?: GridPaginationModel;
};

/**
 * Render tabular View for dataset
 */
export default function TableView({ 
  viewId, 
  columns, 
  rows, 
  loading, 
  totalCount,
  onPaginationModelChange,
  paginationModel = { page: 0, pageSize: 100 }
}: TableViewProps) {
  return (
    <DataGrid
      key={`data-grid-${viewId}`}
      rows={rows}
      columns={columns}
      loading={loading}
      rowCount={totalCount}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      pageSizeOptions={[100]}
      slotProps={{
        loadingOverlay: {
          variant: 'skeleton',
          noRowsVariant: 'skeleton',
        },
      }}
    />
  );
}
