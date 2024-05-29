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

export default function ViewConfigDrawer({
  open,
  onClose,
  columnOptions,
  viewTypes,
  configData,
  onAddNewView,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  columnOptions: GridColDef[];
  viewTypes: { type: string; name: string }[];
  configData: { type: string; value: string; name: string; params: any };
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
  mode: 'new' | 'view' | boolean;
}) {
  useEffect(() => {
    if (mode === 'view') {
      if (configData) {
        setViewName(configData.name);
        setViewType(configData.type);
        setdisplayColumnId(configData.value);
        setYAxisUnit(configData.params.yAxisUnit);
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
        {configData.type !== 'table' && (
          <>
            <InputLabel id="display-column-label">Display Column</InputLabel>
            <p>{displayColumnId}</p>
            <InputLabel id="y-axis-label">Y-Axis Unit Name</InputLabel>
            <p>{yAxisUnit}</p>
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
