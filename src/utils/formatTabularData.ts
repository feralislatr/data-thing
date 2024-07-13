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
  const hiddenColumnIndices = [];
  const columns = data?.meta?.view?.columns;
  if (!columns) {
    return { filteredColumns, filteredRows: [] };
  }
  for (const column of columns) {
    if (column.flags?.includes('hidden')) {
      const index = columns.indexOf(column);
      hiddenColumnIndices.push(index);
    } else {
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
    for (const cell of row) {
      const cellIndex = row.indexOf(cell);
      if (hiddenColumnIndices.includes(cellIndex)) {
        continue;
      }
      const column = columns[cellIndex];
      filteredRow[column.fieldName] = cell;
    }
    filteredRows.push({ id: rowIndex, ...filteredRow });
  }
  return { filteredColumns, filteredRows };
}
