import { DataSet } from "@/types/dataSet";
import { useQuery } from "@tanstack/react-query";

export function useDataSets(): {
  dataSetList: DataSet[] | undefined;
  isLoading: boolean,
} {
  const { data, isLoading } = useQuery<any>({ // isError, isSuccess
    queryKey: ['dataSets'],
    queryFn: () => fetch("/catalog/api/3/action/package_search", {
      method: 'GET',
      headers: {
        "X-Api-Key": "DEMO_KEY",
      },
    })
    .then(res => res.json())
    .then(data => data.result.results)
  });
  return { dataSetList: data, isLoading };
};

export function useDataSet(url: string): {
  data: DataSet | undefined;
  isLoading: boolean;
} {
  console.log({ url });
  
  const { data, isLoading } = useQuery<any>({
    enabled: Boolean(url),
    queryKey: ['dataSet'],
    queryFn: () => fetch(url, {
      method: 'GET',
    })
    .then(res => res.json())
  });
  console.log({ data });
  
  return { data, isLoading}
};
