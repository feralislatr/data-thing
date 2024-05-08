import { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Data } from '@/types/dataSet';
import { v4 as uuidv4 } from 'uuid';
import { useDataSetContext } from '@/providers/DataSetProvider';

export function TableView({
  data,
  isLoading,
  viewId,
}: {
  data: Data;
  isLoading: boolean;
  viewId: string;
}) {
  const { columns, rows } = useMemo(() => {
    // first find number of columns where id = -1 (unique to electric vehicle dataset)
    let filteredColumns = [];
    let hiddenCount = 0;
    for (let i = 0; i < data?.meta?.view?.columns.length; i++) {
      if (data.meta.view.columns[i].id == -1) {
        hiddenCount++;
      } else {
        filteredColumns.push({
          field: data.meta.view.columns[i].fieldName,
          headerName: data.meta.view.columns[i].name,
          type: data.meta.view.columns[i].dataTypeName || 'string',
        });
      }
    }

    let filteredRows = [];
    // map over each record -- limiting to 100 for performance
    for (let i = 0; i < 100; i++) {
      let datum = data?.data[i];
      let row = {};
      for (let j = 0; j < filteredColumns.length; j++) {
        row[filteredColumns[j].field] = datum[hiddenCount + j];
      }
      filteredRows[i] = {
        id: uuidv4(),
        ...row,
      };
    }
    return { columns: filteredColumns, rows: filteredRows };
  }, [data]);
  const { setDataColumns, setDataRows } = useDataSetContext();
  setDataColumns(columns);
  setDataRows(rows);

  return <DataGrid rows={rows} columns={columns} />;
}
