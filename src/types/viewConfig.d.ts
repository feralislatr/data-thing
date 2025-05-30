import { GridColDef } from '@mui/x-data-grid';

export type ViewConfig = {
  id: string;
  dataSetId: string;
  type: string;
  value: string;
  params?: {
    selectedColumn?: GridColDef;
    yAxisUnit?: string;
  };
  name: string;
};
