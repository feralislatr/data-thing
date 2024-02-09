'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { useDataSets } from '../hooks/use-datasets';
import DataSetList from '../components/DataSetList';
import { useDataSetContext } from '../providers/DataSetProvider';

export default function Home() {
  const { dataSetList, isLoading } = useDataSets();
  const { setDataSetList } = useDataSetContext();
  setDataSetList(dataSetList);
  return (
    <main className={styles.main}>
      <div>
        <Image src="/logo.png" alt="data thing" width={400} height={100} priority />
      </div>

      <div className={styles.grid}>
        <h2>datasets</h2>
        <DataSetList isLoading={isLoading} />
      </div>
    </main>
  );
}
