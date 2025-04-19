'use client';

import { DataSetRaw } from '@/types/dataSet';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import getOrCreateDataset from '@/utils/update-dataview';

type DataSetListProps = {
  dataSetList: DataSetRaw[];
};

const handleClick = async (
  e: React.MouseEvent<HTMLAnchorElement>,
  dataset: DataSetRaw,
  router: any,
) => {
  e.preventDefault();
  try {
    getOrCreateDataset(dataset);
    // const response = await fetch(`/api/datasets/${dataset.name}`);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch dataset');
    // }

    // After successful API call, navigate to the chart page
    router.push(`/chart/${dataset.name}`);
  } catch (error) {
    console.error('Error fetching dataset:', error);
    // Handle error appropriately
  }
};

/**
 * Render each dataset displaying the title, modified date, maintaining agency, and description.
 * Link to each dataset's Chart page on click, determined by the dataset name.
 */
const renderDataSet = (dataset: DataSetRaw) => {
  return (
    <Link
      key={dataset.name}
      className="dataset"
      href={`/chart/${dataset.name}`}
      // onClick={e => handleClick(e, dataset, router)}
    >
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
export default function DataSetList({ dataSetList }: DataSetListProps) {
  // const router = useRouter();
  return (
    <div className={styles['dataset-list']}>
      {!dataSetList.length ? 'loading...' : dataSetList?.map(item => renderDataSet(item))}
    </div>
  );
}
