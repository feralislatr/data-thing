'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { Chip, IconButton } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AddIcon from '@mui/icons-material/Add';
import styles from './styles.module.scss';
import ErrorBoundary from '@/providers/ErrorBoundary';
import DisplayChart from '@/components/DisplayChart';
import ViewConfigDrawer from '@/components/ViewConfigDrawer';
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

/**
 * Render chips that display configured Views
 */
const renderViewButton = (
  view: ViewConfig,
  activeView: ViewConfig,
  setActiveView: Dispatch<SetStateAction<ViewConfig>>,
) => (
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

interface ChartPageViewProps {
  chartTitle: string;
  description: string;
  columns: any[];
  rows: any[];
  isLoading: boolean;
}

/**
 * Render Chart page where users may view data or create a new chart View
 */
export default function ChartPageView({
  chartTitle,
  description,
  columns,
  rows,
  isLoading,
}: ChartPageViewProps) {
  // log({ columns: columns, rows: rows });

  // console.log({ description });
  const [activeView, setActiveView] = useState(initialViewList[0]);
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
      <div className="chart-title">
        <h3>{chartTitle}</h3>
        <IconButton sx={{ color: 'text.primary' }} onClick={() => setDrawerMode('view')}>
          <DensityMediumIcon />
        </IconButton>
      </div>
      <div className="view-list">
        {viewList.map(view => renderViewButton(view, activeView, setActiveView))}
        <Chip
          variant="outlined"
          color="primary"
          onClick={() => setDrawerMode('new')}
          label={<AddIcon />}
        />
      </div>
      <p>{description || ''}</p>
      <ErrorBoundary>
        {isLoading ? (
          'ChartPageView is loading...'
        ) : (
          <>
            <DisplayChart
              activeView={activeView}
              filteredColumns={columns}
              filteredRows={rows}
              // loading={isLoading}
              // loading={isLoading || !Boolean(columns?.length)}
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
          </>
        )}
      </ErrorBoundary>
    </main>
  );
}
