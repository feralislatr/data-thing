'use client';
import Link from 'next/link';
import { useDataSetContext } from '../../providers/DataSetProvider';
import { useDataSet } from '@/hooks/use-datasets';
export default function ChartPage({ searchParams }: { searchParams: { name: string } }) {
  const { dataSet } = useDataSetContext();
  const { data, isLoading } = useDataSet(
    dataSet?.resources.find(item => item.format === 'JSON')?.url,
  );
  return (
    <div>
      <div>
        <Link href={{ pathname: '/' }}>dataTHING</Link>
      </div>
      <div>
        <div>
          <h3>{dataSet?.title || 'title'}</h3>
          hamburger menu to open drawer
        </div>

        <div>view switcher</div>
        <div>chart view</div>
      </div>
    </div>
  );
}
