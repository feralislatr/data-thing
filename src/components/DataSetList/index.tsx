'use client';
import { useState } from 'react';
import { DataSet } from '@/types/dataSet';
import Link from 'next/link';
import { useDataSetContext } from '../../providers/DataSetProvider';

export default function DataSetList({ isLoading }: { isLoading: boolean }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { dataSetList, setDataSet } = useDataSetContext();
  const item = dataSetList?.find(item => item.name === selectedId);

  setDataSet(item);

  function renderDataSet(dataset: DataSet) {
    return (
      <Link
        key={dataset.name}
        href={{
          pathname: '/chart',
          query: {
            name: dataset.name,
          },
        }}
        onClick={() => {
          setSelectedId(dataset.name);
        }}
      >
        <h3>{dataset.title}</h3>
        <div>
          <h4>{dataset.metadata_modified}</h4>
          <h4>{dataset.maintainer}</h4>
        </div>
        <p>{dataset.notes}</p>
      </Link>
    );
  }

  return (
    <div>
      <div>{isLoading ? 'loading...' : dataSetList?.map(item => renderDataSet(item))}</div>
    </div>
  );
}
