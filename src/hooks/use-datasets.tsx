import { DataSet, Data } from '@/types/dataSet';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import formatTabularData from '@/utils/formatTabularData';
import getData from '@/utils/get-data';
import getDataSets from '@/utils/get-datasets';

export function useDataSetList(): {
  dataSetList: DataSet[] | undefined;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery<any>({
    queryKey: ['dataSets'],
    queryFn: getDataSets,
    meta: { persist: true },
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
    queryFn: () => getData(url),
  });

  const { filteredColumns, filteredRows } = formatTabularData(data);

  return { data, filteredColumns, filteredRows, isLoading };
}
