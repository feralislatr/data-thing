import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

export function TableView({
  columns,
  rows,
  viewId,
}: {
  columns: GridColDef[];
  rows: GridRowsProp[];
  viewId: string;
}) {
  return <DataGrid key={`data-grid-${viewId}`} rows={rows} columns={columns} />;
}
