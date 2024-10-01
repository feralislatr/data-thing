import Image from 'next/image';
import styles from './page.module.scss';
import DataSetList from '@/components/DataSetList';
import getDataSets from '@/utils/get-datasets';

export default async function Home() {
  const dataSetList = await getDataSets();
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
        <DataSetList dataSetList={dataSetList} />
      </section>
    </main>
  );
}
