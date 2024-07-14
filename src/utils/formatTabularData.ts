import { Data } from '@/types/dataSet';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

/**
 * Transform data.gov distribution download into proper format for MUI DataGrid component.
 * Reference: https://resources.data.gov/resources/dcat-us/
 */
export default function formatTabularData(data: Data): {
  filteredColumns: GridColDef[];
  filteredRows: GridValidRowModel[];
} {
  const filteredColumns: GridColDef[] = [];
  const visibleColumnIndices = [];
  const columns = data?.meta?.view?.columns;
  if (!columns) {
    return { filteredColumns, filteredRows: [] };
  }
  for (const column of columns) {
    if (column.flags?.includes('hidden')) {
      continue;
    } else {
      visibleColumnIndices.push(columns.indexOf(column));
      filteredColumns.push({
        field: column.fieldName,
        headerName: column.name,
      });
    }
  }
  let filteredRows = [];
  const rows = data?.data;
  for (const row of rows) {
    const rowIndex = rows.indexOf(row);
    const filteredRow: Record<string, any> = {};
    for (const index of visibleColumnIndices) {
      filteredRow[columns[index].fieldName] = row[index];
    }
    filteredRows.push({ id: rowIndex, ...filteredRow });
  }
  return { filteredColumns, filteredRows };
}
