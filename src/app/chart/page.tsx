'use client';
import { useState } from 'react';
import { useDataSetContext } from '@/providers/DataSetProvider';
import { useDataSet } from '@/hooks/use-datasets';
import { Chip, IconButton, Drawer } from '@mui/material';
import { TableView } from '@/components/TableView';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AddIcon from '@mui/icons-material/Add';
import styles from './styles.module.scss';
import ErrorBoundary from '@/providers/ErrorBoundary';
import { BarChartView } from '@/components/BarChartView';

const viewList = [
  {
    type: 'table',
    value: 'default table',
    params: '',
    name: 'Table',
  },
  {
    type: 'bar',
    value: 'default bar',
    params: '',
    name: 'Bar Chart',
  },
];

export default function ChartPage({ searchParams }: { searchParams: { name: string } }) {
  const { dataSet } = useDataSetContext();
  const { data, isLoading } = useDataSet(
    dataSet?.resources.find(item => item.format === 'JSON')?.url,
    dataSet?.name,
  );
  const [activeView, setActiveView] = useState({ type: 'table', value: 'default table' });
  const [openDrawer, setOpenDrawer] = useState(false);

  const displayChart = () => {
    switch (activeView.type) {
      case 'bar':
        return <BarChartView viewId={activeView.value} data={data} />;
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
    <>
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
            onClick={() => setOpenDrawer(true)}
            label={<AddIcon />}
          />
        </div>
        {isLoading ? (
          'Loading...'
        ) : (
          <ErrorBoundary>
            <p>{data.meta.view.description}</p>
            {displayChart()}
          </ErrorBoundary>
        )}
        <Drawer anchor={'right'} open={openDrawer} onClose={() => setOpenDrawer(false)}>
          Add New View
        </Drawer>
      </main>
    </>
  );
}
