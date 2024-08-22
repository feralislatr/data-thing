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
 * Get dataset data using select
 */
export const useDataSetQuery = (url: string | null, name: string, select: (data: Data) => any) => {
  const { data, isLoading } = useQuery<any>({
    enabled: Boolean(url),
    queryKey: [name],
    queryFn: () => getData(url),
    select,
  });
  return { ...data, isLoading };
};

/**
 * Get view details from a given dataset by name
 */
export const useDataSetDetails = (url: string | null, name: string) =>
  useDataSetQuery(url, name, data => data.meta.view);

/**
 * Get JSON data from a given dataset by name
 */
export const useDataSetData = (
  url: string | null,
  name: string,
): { filteredColumns: GridColDef[]; filteredRows: GridValidRowModel[]; isLoading: boolean } =>
  useDataSetQuery(url, name, data => formatTabularData(data));
