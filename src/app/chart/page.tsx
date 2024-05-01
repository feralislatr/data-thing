'use client';
import { useState } from 'react';
import { useDataSetContext } from '@/providers/DataSetProvider';
import { useDataSet } from '@/hooks/use-datasets';
import { Chip, IconButton } from '@mui/material';
import { TableView } from '@/components/TableView';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AddIcon from '@mui/icons-material/Add';
import styles from './styles.module.scss';
import ErrorBoundary from '@/providers/ErrorBoundary';

const viewList = [
  {
    type: 'table',
    value: 'default',
    params: '',
    name: 'Table',
  },
  {
    type: 'view2',
    value: 'view2',
    params: '',
    name: 'View 2',
  },
];

export default function ChartPage({ searchParams }: { searchParams: { name: string } }) {
  const { dataSet } = useDataSetContext();
  const { data, isLoading } = useDataSet(
    dataSet?.resources.find(item => item.format === 'JSON')?.url,
    dataSet?.name,
  );
  const [activeView, setActiveView] = useState({ type: 'table', value: 'default' });

  const displayChart = () => {
    switch (activeView.type) {
      case 'view2':
        return <div>View 2 {activeView.value}</div>;
      case 'table':
        return <TableView viewId={activeView.value} data={data} isLoading={isLoading} />;
      default:
        return <div>View not supported</div>;
    }
  };

  const viewButton = view => (
    <Chip
      key={view.value}
      variant={view.value === activeView.value ? 'filled' : 'outlined'}
      color="primary"
      onClick={() => {
        setActiveView(view);
      }}
      label={view.name}
    />
  );
  return (
    <main className={styles['chart-container']}>
      <div className="chart-title">
        <h3>{dataSet?.title || 'title'}</h3>
        <IconButton sx={{ color: 'text.primary' }}>
          <DensityMediumIcon />
        </IconButton>
      </div>
      <div className="view-list">
        {viewList.map(view => viewButton(view))}
        <Chip
          variant="outlined"
          color="primary"
          onClick={() => {
            () => null;
          }}
          label={<AddIcon />}
        />
      </div>
      <ErrorBoundary>{displayChart()}</ErrorBoundary>
    </main>
  );
}
