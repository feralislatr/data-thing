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
import { useState } from 'react';

export default function ViewConfigDrawer({
  open,
  onClose,
  columnOptions,
  viewTypes,
  onAddNewView,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  columnOptions: GridColDef[];
  viewTypes: { type: string; name: string }[];
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
  mode: 'new' | 'edit' | boolean;
}) {
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

  // TODO
  const renderEditMode = () => {};

  const renderViewMode = () => {};

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
        <h3>{mode === 'new' ? 'Add New View' : 'View Config'}</h3>
        <TextField
          label="View Name"
          variant="outlined"
          fullWidth
          value={viewName}
          sx={{ marginTop: 4 }}
          onChange={e => setViewName(e.target.value)}
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
        />
        <Button
          sx={{ height: 60 }}
          variant="contained"
          fullWidth
          color="secondary"
          onClick={handleSubmit}
        >
          Add View
        </Button>
      </Box>
    </Drawer>
  );
}
