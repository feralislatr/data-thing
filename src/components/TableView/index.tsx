import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

export function TableView({
  viewId,
  columns,
  rows,
}: {
  viewId: string;
  columns: GridColDef[];
  rows: GridRowsProp[];
}) {
  return <DataGrid key={`data-grid-${viewId}`} rows={rows} columns={columns} />;
}
