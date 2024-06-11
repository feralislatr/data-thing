import { DataSet, Data } from '@/types/dataSet';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import formatTabularData from '@/utils/formatTabularData';
import getData from '@/utils/get-data';
import getDataSets from '@/utils/get-datasets';

export function useDataSetList(): {
  dataSetList: DataSet[];
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery<any>({
    queryKey: ['dataSets'],
    queryFn: getDataSets,
    meta: { persist: true },
    placeholderData: [],
  });
  return { dataSetList: data, isLoading };
}

export function useDataSet(
  url: URL | null,
  name: string,
): {
  data: Data;
  filteredColumns: GridColDef[];
  filteredRows: GridValidRowModel[];
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
