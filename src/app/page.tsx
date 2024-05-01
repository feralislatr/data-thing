'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import { useDataSets } from '../hooks/use-datasets';
import DataSetList from '../components/DataSetList';

export default function Home() {
  const { dataSetList, isLoading } = useDataSets();
  return (
    <main className={styles.main}>
      <section className="title-panel">
        <div className="title">
          <Image src="/logo.png" alt="data thing" width={400} height={100} priority />
          <p>
            another chart app project
            <br />
            data from data.gov
          </p>
        </div>
      </section>

      <section className="dataset-panel">
        <h2>datasets</h2>
        <DataSetList isLoading={isLoading} dataSetList={dataSetList} />
      </section>
    </main>
  );
}
