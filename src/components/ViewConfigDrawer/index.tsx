import { ViewConfig } from '@/types/viewConfig';
import {
  Drawer,
  Box,
  TextField,
  MenuItem,
  Select,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

/**
 * Render Drawer component to either view or create a new Chart View.
 * "new" mode renders editable view for creating a new Chart.
 * "view" mode renders non-editable view to see current config.
 */
export default function ViewConfigDrawer({
  open,
  onClose,
  columnOptions,
  viewTypes,
  viewConfig,
  onAddNewView,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  columnOptions: GridColDef[];
  viewTypes: { type: string; name: string }[];
  viewConfig: ViewConfig | null;
  onAddNewView: ({
    viewName,
    viewType,
    displayColumnId,
    yAxisUnit,
  }: {
    viewName: string;
    viewType: string;
    displayColumnId: string;
    yAxisUnit: string;
  }) => void;
  mode: 'new' | 'view' | undefined;
}) {
  // populate fields with current data if in view mode
  useEffect(() => {
    if (mode === 'view') {
      if (viewConfig) {
        setViewName(viewConfig.name);
        setViewType(viewConfig.type);
        setdisplayColumnId(viewConfig.value);
        if (viewConfig?.params?.yAxisUnit) {
          setYAxisUnit(viewConfig.params.yAxisUnit);
        }
      }
    } else {
      setViewName('');
      setViewType('');
      setdisplayColumnId('');
      setYAxisUnit('');
    }
  }, [mode]);

  const [viewName, setViewName] = useState('');
  const [viewType, setViewType] = useState('');
  const [displayColumnId, setdisplayColumnId] = useState('');
  const [yAxisUnit, setYAxisUnit] = useState('');

  const handleSubmit = () => {
    onAddNewView({ viewName, viewType, displayColumnId, yAxisUnit });
    onClose();
    setViewName('');
    setViewType('');
    setdisplayColumnId('');
    setYAxisUnit('');
  };

  const formatViewTypes = viewTypes.map(item => (
    <MenuItem key={`view-type-${item.type}`} value={item.type}>
      {item.name}
    </MenuItem>
  ));

  const formatdisplayColumnIds = columnOptions.map(item => (
    <MenuItem key={`column-type-${item.field}`} value={item.field}>
      {item.headerName}
    </MenuItem>
  ));

  /** Render empty fields for creating a new View */
  const renderEditMode = () => {
    return (
      <>
        <h3>{mode === 'new' ? 'Add New View' : 'View Config'}</h3>
        <TextField
          label="View Name"
          variant="outlined"
          fullWidth
          value={viewName}
          sx={{ marginTop: 4 }}
          onChange={e => setViewName(e.target.value)}
          disabled={mode === 'view'}
        />
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="view-type-label">View Type</InputLabel>
          <Select
            label="View Type"
            labelId="view-type-label"
            variant="outlined"
            fullWidth
            value={viewType}
            onChange={e => setViewType(e.target.value)}
            disabled={mode === 'view'}
          >
            {formatViewTypes}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="display-column-label">Display Column</InputLabel>
          <Select
            label="Display Column"
            labelId="display-column-label"
            variant="outlined"
            fullWidth
            value={displayColumnId}
            onChange={e => setdisplayColumnId(e.target.value)}
            disabled={mode === 'view'}
          >
            {formatdisplayColumnIds}
          </Select>
        </FormControl>
        <TextField
          label="Y-Axis Unit Name"
          variant="outlined"
          fullWidth
          value={yAxisUnit}
          onChange={e => setYAxisUnit(e.target.value)}
          disabled={mode === 'view'}
        />
        {mode === 'new' && (
          <Button
            sx={{ height: 60 }}
            variant="contained"
            fullWidth
            color="secondary"
            onClick={handleSubmit}
          >
            Add View
          </Button>
        )}
      </>
    );
  };

  /** Render disabled fields for viewing current config only */
  const renderViewMode = () => {
    return (
      <>
        <h3>{mode === 'new' ? 'Add New View' : 'View Config'}</h3>
        <TextField
          label="View Name"
          variant="outlined"
          fullWidth
          value={viewName}
          sx={{ marginTop: 4 }}
          onChange={e => setViewName(e.target.value)}
          disabled={mode === 'view'}
        />
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="view-type-label" disabled={mode === 'view'}>
            View Type
          </InputLabel>
          <Select
            label="View Type"
            labelId="view-type-label"
            variant="outlined"
            fullWidth
            value={viewType}
            onChange={e => setViewType(e.target.value)}
            disabled={mode === 'view'}
          >
            {formatViewTypes}
          </Select>
        </FormControl>
        {viewConfig?.type !== 'table' && (
          <>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="display-column-label" disabled={mode === 'view'}>
                Display Column
              </InputLabel>
              <Select
                label="Display Column"
                labelId="display-column-label"
                variant="outlined"
                fullWidth
                value={displayColumnId}
                onChange={e => setdisplayColumnId(e.target.value)}
                disabled={mode === 'view'}
              >
                {formatdisplayColumnIds}
              </Select>
            </FormControl>
            <TextField
              label="Y-Axis Unit Name"
              variant="outlined"
              fullWidth
              value={yAxisUnit}
              onChange={e => setYAxisUnit(e.target.value)}
              disabled={mode === 'view'}
            />
          </>
        )}
      </>
    );
  };

  return (
    <Drawer anchor={'right'} open={open} onClose={onClose}>
      <Box
        component="form"
        sx={{
          width: '40vw',
          minWidth: 250,
          padding: '4rem 1rem 1rem',
        }}
      >
        {mode === 'view' ? renderViewMode() : renderEditMode()}
      </Box>
    </Drawer>
  );
}
