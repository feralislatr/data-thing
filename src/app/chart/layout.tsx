import Image from 'next/image'
import Link from 'next/link'

import styles from './page.module.scss'

export default function ChartLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <header className={styles.header}>
        <Link href={{ pathname: '/' }}>
          <Image src="/logo.png" alt="data thing" width={200} height={50} priority />
        </Link>
      </header>
      {children}
    </div>
  )
}
