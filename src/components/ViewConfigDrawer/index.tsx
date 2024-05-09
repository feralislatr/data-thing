import { Drawer } from '@mui/material';

export default function ViewConfigDrawer({ open, onClose }) {
  return (
    <Drawer anchor={'right'} open={open} onClose={onClose}>
      <h3>Add New View</h3>
    </Drawer>
  );
}
