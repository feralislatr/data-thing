import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function ChartHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
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
  );
}
