import { DataSet, Data } from '@/types/dataSet';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import formatTabularData from '@/utils/formatTabularData';

export function useDataSets(): {
  dataSetList: DataSet[] | undefined;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery<any>({
    queryKey: ['dataSets'],
    queryFn: () =>
      fetch('/catalog/api/3/action/package_search', {
        method: 'GET',
        headers: {
          'X-Api-Key': 'DEMO_KEY',
        },
      })
        .then(res => res.json())
        // filter for JSON dataSets for now
        .then(data =>
          data.result.results.filter(dataSet =>
            dataSet?.resources.find(item => item.format === 'JSON'),
          ),
        ),
  });
  return { dataSetList: data, isLoading };
}

export function useDataSet(
  url: string,
  name: string,
): {
  data: Data | undefined;
  filteredColumns: GridColDef[];
  filteredRows: GridRowsProp[];
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery<any>({
    enabled: Boolean(url),
    queryKey: [name],
    queryFn: () =>
      fetch(url, {
        method: 'GET',
      }).then(res => res.json()),
  });

  const { filteredColumns, filteredRows } = formatTabularData(data);

  return { data, filteredColumns, filteredRows, isLoading };
}
