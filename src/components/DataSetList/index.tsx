'use client';
import { useEffect, useState } from 'react';
import { DataSet } from '@/types/dataSet';
import Link from 'next/link';
import { useDataSetContext } from '../../providers/DataSetProvider';
import styles from './styles.module.scss';

export default function DataSetList({
  isLoading,
  dataSetList,
}: {
  isLoading: boolean;
  dataSetList: DataSet[] | undefined;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { setDataSet } = useDataSetContext();
  useEffect(() => {
    const item = dataSetList?.find(item => item.name === selectedId);
    setDataSet(item);
  }, [selectedId]);

  function renderDataSet(dataset: DataSet) {
    return (
      <Link
        key={dataset.name}
        className="dataset"
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
    <div className={styles['dataset-list']}>
      {isLoading ? 'loading...' : dataSetList?.map(item => renderDataSet(item))}
    </div>
  );
}
