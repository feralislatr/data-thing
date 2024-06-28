'use client';
import { DataSet } from '@/types/dataSet';
import Link from 'next/link';
import { useDataSetList } from '@/hooks/use-datasets';
import styles from './styles.module.scss';

/**
 * Render each dataset displaying the title, modified date, maintaining agency, and description.
 * Link to each dataset's Chart page on click, determined by the dataset name.
 */
const renderDataSet = (dataset: DataSet) => {
  return (
    <Link key={dataset.name} className="dataset" href={`/chart/${dataset.name}`}>
      <h3>{dataset.title}</h3>
      <div>
        <h4>{dataset.metadata_modified}</h4>
        <h4>{dataset.maintainer}</h4>
      </div>
      <p>{dataset.notes}</p>
    </Link>
  );
};

/**
 * Render list of datasets from the catalog.
 */
export default function DataSetList() {
  const { dataSetList, isLoading } = useDataSetList();

  return (
    <div className={styles['dataset-list']}>
      {isLoading ? 'loading...' : dataSetList?.map(item => renderDataSet(item))}
    </div>
  );
}
