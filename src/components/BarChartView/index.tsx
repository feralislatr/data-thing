import { BarChart } from '@mui/x-charts/BarChart';
import { Data } from '@/types/dataSet';
import { useDataSetContext } from '@/providers/DataSetProvider';
import { useMemo } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

export function BarChartView({
  viewId,
  columns,
  rows,
}: {
  viewId: string;
  columns: GridColDef[];
  rows: GridRowsProp[];
}) {
  const indVariable = columns[5]; // hardcoding model year column
  const { dataset } = useMemo(() => {
    // yAxis
    const map = new Map();
    for (let i = 0; i < rows.length; i++) {
      const datum = rows[i][indVariable.field];
      if (map.has(datum)) {
        let temp = map.get(datum);
        map.set(datum, (temp += 1));
      } else {
        map.set(datum, 1);
      }
    }

    const rawDataset = Object.fromEntries(map.entries());
    const dataset = Object.keys(rawDataset).map(key => ({
      label: key,
      value: rawDataset[key],
    }));

    return { dataset };
  }, [indVariable, rows]);

  return (
    <BarChart
      yAxis={[{ label: '# of Items' }]}
      xAxis={[{ scaleType: 'band', dataKey: 'label', label: indVariable.headerName }]}
      series={[{ dataKey: 'value', label: '# of Items' }]}
      dataset={dataset}
      width={600}
      height={400}
    />
  );
}
