'use client';
import { Dispatch, SetStateAction, useState, memo, MemoExoticComponent, ReactNode } from 'react';
import { useDataSet, useDataSetList } from '@/hooks/use-datasets';
import { Chip, IconButton } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AddIcon from '@mui/icons-material/Add';
import styles from '../styles.module.scss';
import ErrorBoundary from '@/providers/ErrorBoundary';
import DisplayChart from '@/components/DisplayChart';
import ViewConfigDrawer from '@/components/ViewConfigDrawer';
import { ViewConfig } from '@/types/viewConfig';
import { DataSet } from '@/types/dataSet';

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
 *  Get dataset item by name
 */
const getDataSetItem = (dataSetList: DataSet[], name: string) => {
  return dataSetList.find(dataSet => dataSet.name === name);
};

/**
 *  Get download URL of the dataset item if it is in JSON format
 */
const getDataSetResourceUrl = (dataSetItem?: DataSet) => {
  if (!dataSetItem) return null;
  const resource = dataSetItem.resources.find(({ format }) => format === 'JSON');
  return resource ? new URL(resource.url) : null;
};

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

/**
 * Render Chart page where users may view data or create a new chart View
 */
export default function ChartPage({ params }: { params: { name: string } }) {
  const { dataSetList } = useDataSetList();
  const dataSetItem = getDataSetItem(dataSetList, params.name);
  const dataSetResourceUrl = getDataSetResourceUrl(dataSetItem);

  const { data, filteredColumns, filteredRows, isLoading } = useDataSet(
    dataSetResourceUrl,
    params.name,
  );
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
    const selectedColumn = filteredColumns.find(col => col.field === configData.displayColumnId);

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
    <>
      <main className={styles['chart-container']}>
        <div className="chart-title">
          <h3>{dataSetItem?.title}</h3>
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
        {isLoading ? (
          'Loading...'
        ) : (
          <ErrorBoundary>
            <p>{data?.meta?.view?.description}</p>
            <DisplayChart activeView={activeView} filteredColumns={filteredColumns} filteredRows={filteredRows} />
            <ViewConfigDrawer
              open={Boolean(drawerMode)}
              onClose={() => setDrawerMode(undefined)}
              columnOptions={filteredColumns}
              viewTypes={viewTypes}
              viewConfig={drawerMode === 'view' ? activeView : null}
              onAddNewView={addNewView}
              mode={drawerMode}
            />
          </ErrorBoundary>
        )}
      </main>
    </>
  );
}
