import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

export function TableView({
  viewId,
  columns,
  rows,
}: {
  viewId: string;
  columns: GridColDef[];
  rows: GridValidRowModel[];
}) {
  return <DataGrid key={`data-grid-${viewId}`} rows={rows} columns={columns} />;
}
