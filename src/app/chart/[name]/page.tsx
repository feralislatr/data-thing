'use client';
import { useState } from 'react';
import { useDataSet, useDataSetList } from '@/hooks/use-datasets';
import { Chip, IconButton } from '@mui/material';
import { TableView } from '@/components/TableView';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AddIcon from '@mui/icons-material/Add';
import styles from '../styles.module.scss';
import ErrorBoundary from '@/providers/ErrorBoundary';
import { BarChartView } from '@/components/BarChartView';
import ViewConfigDrawer from '@/components/ViewConfigDrawer';
import { v4 as uuidv4 } from 'uuid';
import { ViewConfig } from '@/types/viewConfig';

const initialViewList: ViewConfig[] = [
  {
    id: '-1',
    type: 'table',
    value: 'default table',
    name: 'Table',
  },
];

const viewTypes = [
  {
    type: 'table',
    name: 'Table',
  },
  {
    type: 'bar',
    name: 'Bar Chart',
  },
];

export default function ChartPage({ params }: { params: { name: string } }) {
  // get dataSet data from url param
  const { dataSetList } = useDataSetList();
  const dataSetItem = dataSetList?.find(dataSet => dataSet.name === params.name);
  const { data, filteredColumns, filteredRows, isLoading } = useDataSet(
    dataSetItem?.resources.find(item => item.format === 'JSON')?.url || '',
    params.name,
  );
  const [activeView, setActiveView] = useState(initialViewList[0]);
  const [drawerMode, setDrawerMode] = useState<'new' | 'view' | undefined>(undefined);
  const [viewList, setViewList] = useState<ViewConfig[]>(initialViewList);

  const addNewView = (configData: {
    viewName: string;
    viewType: string;
    displayColumnId: string;
    yAxisUnit: string;
  }) => {
    const selectedColumn = filteredColumns.find(col => col.field === configData.displayColumnId);

    // formats into ViewConfig
    setViewList(state => [
      ...state,
      {
        id: uuidv4(),
        type: configData.viewType,
        value: configData.displayColumnId,
        params: {
          selectedColumn,
          yAxisUnit: configData.yAxisUnit,
        },
        name: configData.viewName,
      },
    ]);
  };

  const displayChart = () => {
    switch (activeView.type) {
      case 'bar':
        return (
          <BarChartView
            viewId={activeView.value}
            columns={filteredColumns}
            rows={filteredRows}
            configData={activeView}
          />
        );
      case 'table':
        return (
          <TableView viewId={activeView.value} columns={filteredColumns} rows={filteredRows} />
        );
      default:
        return <div>View not supported</div>;
    }
  };

  const renderViewButton = (view: ViewConfig) => (
    <Chip
      key={view.id}
      variant={view.id === activeView.id ? 'filled' : 'outlined'}
      color="primary"
      onClick={() => {
        setActiveView(view);
      }}
      disabled={view.id === activeView.id}
      label={view.name}
    />
  );
  return (
    <>
      <main className={styles['chart-container']}>
        <div className="chart-title">
          <h3>{dataSetItem?.title || 'title'}</h3>
          <IconButton sx={{ color: 'text.primary' }} onClick={() => setDrawerMode('view')}>
            <DensityMediumIcon />
          </IconButton>
        </div>
        <div className="view-list">
          {viewList.map(view => renderViewButton(view))}
          <Chip
            variant="outlined"
            color="primary"
            onClick={() => setDrawerMode('new')}
            label={<AddIcon />}
          />
        </div>
        {isLoading ? (
          'Loading...'
        ) : (
          <ErrorBoundary>
            <p>{data?.meta?.view?.description}</p>
            {displayChart()}
            <ViewConfigDrawer
              open={Boolean(drawerMode)}
              onClose={() => setDrawerMode(undefined)}
              columnOptions={filteredColumns}
              viewTypes={viewTypes}
              viewConfig={drawerMode === 'view' ? activeView : null}
              onAddNewView={configData => addNewView(configData)}
              mode={drawerMode}
            />
          </ErrorBoundary>
        )}
      </main>
    </>
  );
}
