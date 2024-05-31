import { v4 as uuidv4 } from 'uuid';
import { Data } from '@/types/dataSet';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

export default function formatTabularData(data: Data): {
  filteredColumns: GridColDef[];
  filteredRows: GridValidRowModel[];
} {
  // first find number of columns where id = -1
  let filteredColumns = [];
  let hiddenCount = 0;
  for (let i = 0; i < data?.meta?.view?.columns.length; i++) {
    if (data.meta.view.columns[i].id == -1) {
      hiddenCount++;
    } else {
      filteredColumns.push({
        field: data.meta.view.columns[i].fieldName,
        headerName: data.meta.view.columns[i].name,
        dataType: data.meta.view.columns[i].dataTypeName || 'string',
      });
    }
  }
  let filteredRows = [];
  // map over each record -- limiting to 100 for performance
  for (let i = 0; i < 100; i++) {
    let datum = data?.data[i];
    let row: { [key: string]: string } = {};
    for (let j = 0; j < filteredColumns.length; j++) {
      row[filteredColumns[j].field] = datum[hiddenCount + j];
    }
    filteredRows[i] = {
      id: uuidv4(),
      ...row,
    };
  }
  return { filteredColumns, filteredRows };
}
