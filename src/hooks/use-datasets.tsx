import { useMemo } from 'react';
import { DataSet, Data } from '@/types/dataSet';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import formatTabularData from '@/utils/formatTabularData';
import getData from '@/utils/get-data';
import getDataSets from '@/utils/get-datasets';

/**
 * Get dataset catalog list
 */
export function useDataSetList(): {
  dataSetList: DataSet[];
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery<any>({
    queryKey: ['dataSets'],
    queryFn: getDataSets,
    placeholderData: [],
  });
  return { dataSetList: data, isLoading };
}

/**
 * Get JSON data from a given dataset by name
 */
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

  const { filteredColumns, filteredRows } = useMemo(() => formatTabularData(data), [data]);

  return { data, filteredColumns, filteredRows, isLoading };
}
