import Image from 'next/image'
import Link from 'next/link'

import DataSetList from '@/components/DataSetList'

import getDataSets from '@/utils/get-datasets'

import styles from './page.module.scss'

export default async function Home() {
  const dataSetList = await getDataSets()
  return (
    <main className={styles.main}>
      <section className="title-panel">
        <div className="title">
          <Link href="/">
            <Image src="/logo.png" alt="data thing" width={400} height={100} priority />
          </Link>
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
  )
}
