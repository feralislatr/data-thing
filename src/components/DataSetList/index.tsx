import Link from 'next/link'

import { DataSet } from '@/types/dataSet'

import styles from './styles.module.scss'

type DataSetListProps = {
  dataSetList: DataSet[]
}

const DEFAULT_PAGE_SIZE = 100

/**
 * Render each dataset displaying the title, modified date, maintaining agency, and description.
 * Link to each dataset's Chart page on click, determined by the dataset name.
 */
const renderDataSet = (dataset: DataSet) => {
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(dataset.metadata_modified_date))

  return (
    <Link
      key={dataset.name}
      className="dataset"
      href={`/chart/${dataset.name}?page=1&pageSize=${DEFAULT_PAGE_SIZE}`}
    >
      <h3>{dataset.title}</h3>
      <div className="dataset-metadata">
        <h4>{`${dataset.orgTitle} - ${dataset.maintainer}`}</h4>
        <h4>{date}</h4>
      </div>
      <p>{dataset.description}</p>
    </Link>
  )
}

/**
 * Render list of datasets from the catalog.
 */
export default function DataSetList({ dataSetList }: DataSetListProps) {
  return (
    <div className={styles['dataset-list']}>
      {!dataSetList.length ? 'loading...' : dataSetList?.map(item => renderDataSet(item))}
    </div>
  )
}
