'use client';
import { useState } from 'react';
import { Chip, IconButton } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AddIcon from '@mui/icons-material/Add';
import styles from '@/app/chart/page.module.scss';
import ErrorBoundary from '@/providers/ErrorBoundary';
import DisplayChart from '@/components/DisplayChart';
import ViewConfigDrawer from '@/components/ViewConfigDrawer';
import { ViewConfig } from '@/types/viewConfig';
import { DataView, DataSet } from '@/types/dataSet';

const initialViewList: ViewConfig[] = [
  {
    id: '-1',
    type: 'table',
    value: '',
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

type ChartPageViewProps = {
  dataSetItem: DataSet | undefined;
  metadata: DataView | undefined;
  columns: any[];
  rows: any[];
};

/**
 * Render Chart page where users may view data or create a new chart View
 */
export default function ChartPageView({
  dataSetItem,
  metadata,
  columns,
  rows,
}: ChartPageViewProps) {
  const date =
    dataSetItem &&
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(new Date(dataSetItem.metadata_modified));

  const [activeView, setActiveView] = useState<ViewConfig>(initialViewList[0]);
  const [drawerMode, setDrawerMode] = useState<'new' | 'view' | undefined>(undefined);
  const [viewList, setViewList] = useState<ViewConfig[]>(initialViewList);

  /**
   * Add a new View to the ViewType list
   */
  const addNewView = (configData: {
    viewName: string;
    viewType: string;
    displayColumnId: string;
    yAxisUnit: string;
  }) => {
    const selectedColumn = columns.find(col => col.field === configData.displayColumnId);

    // formats into ViewConfig
    setViewList(state => [
      ...state,
      {
        // TODO: find better id
        id: `${state.length + 1}`,
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

  return (
    <main className={styles['chart-container']}>
      <div className="chart-metadata">
        <div className="chart-metadata-tags">
          <div>{metadata?.category}</div>
          <div>{date ?? ''}</div>
        </div>
        <div className="chart-title">
          <h3>{dataSetItem?.title ?? ''}</h3>
          <IconButton sx={{ color: 'text.primary' }} onClick={() => setDrawerMode('view')}>
            <DensityMediumIcon />
          </IconButton>
        </div>
        <h4>{`${dataSetItem?.organization.title} - ${dataSetItem?.maintainer}`}</h4>
        <p>{metadata?.description ?? 'N/A'}</p>
      </div>
      <div className="view-list">
        {viewList.map(view => (
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
        ))}
        <Chip
          variant="outlined"
          color="primary"
          onClick={() => setDrawerMode('new')}
          label={<AddIcon />}
        />
      </div>
      <ErrorBoundary>
        <DisplayChart
          activeView={activeView}
          filteredColumns={columns}
          filteredRows={rows}
          loading={!Boolean(columns?.length)}
        />
        <ViewConfigDrawer
          open={Boolean(drawerMode)}
          onClose={() => setDrawerMode(undefined)}
          columnOptions={columns}
          viewTypes={viewTypes}
          viewConfig={drawerMode === 'view' ? activeView : null}
          onAddNewView={addNewView}
          mode={drawerMode}
        />
      </ErrorBoundary>
    </main>
  );
}
