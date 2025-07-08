import { toSnakeCase } from '@/utils/string-util';
import { Data } from '@/types/dataSet';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

/**
 * Transform JSON data.gov distribution download into proper format for MUI DataGrid component.
 * Reference: https://resources.data.gov/resources/dcat-us/
 */
export function formatTabularDataJson(data: Data): {
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

/**
 * Transform CSV data.gov distribution download into proper format for MUI DataGrid component.
 * Reference: https://resources.data.gov/resources/dcat-us/
 */
export function formatTabularDataCsv(data: string) {
  const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');
  const splitAndTrim = (str: string) => str.split(',').map(v => v.trim());

  if (lines.length === 0) return { rows: [], columns: [] };

  const headers = splitAndTrim(lines[0]);
  const columns = headers.map(h => ({ field: toSnakeCase(h), headerName: h }));

  const processBatch = function* (batchSize: number = 100) {
    for (let i = 1; i < lines.length; i += batchSize) {
      const batch = lines.slice(i, i + batchSize);
      const rows: GridValidRowModel[] = [];

      for (const line of batch) {
        const values = splitAndTrim(line);
        const row: Record<string, string> = {};
        for (let j = 0; j < headers.length; j++) {
          row[toSnakeCase(headers[j])] = values[j] ?? '';
        }
        rows.push({ id: i + batch.indexOf(line), ...row });
      }

      yield rows;
    }
  }

  return {
    columns,
    processBatch,
  };
}
