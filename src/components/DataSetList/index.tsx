'use client';

import { DataSetRaw } from '@/types/dataSet';
import Link from 'next/link';
import styles from './styles.module.scss';

type DataSetListProps = {
  dataSetList: DataSetRaw[];
};

/**
 * Render each dataset displaying the title, modified date, maintaining agency, and description.
 * Link to each dataset's Chart page on click, determined by the dataset name.
 */
const renderDataSet = (dataset: DataSetRaw) => {
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(dataset.metadata_modified));

  return (
    <Link key={dataset.name} className="dataset" href={`/chart/${dataset.name.slice(0, 48)}`}>
      <h3>{dataset.title}</h3>
      <div className="dataset-metadata">
        <h4>{`${dataset.organization.title} - ${dataset.maintainer}`}</h4>
        <h4>{date}</h4>
      </div>
      <p>{dataset.notes}</p>
    </Link>
  );
};

/**
 * Render list of datasets from the catalog.
 */
export default function DataSetList({ dataSetList }: DataSetListProps) {
  return (
    <div className={styles['dataset-list']}>
      {!dataSetList.length ? 'loading...' : dataSetList?.map(item => renderDataSet(item))}
    </div>
  );
}
