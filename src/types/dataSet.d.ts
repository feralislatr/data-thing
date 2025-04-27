export type Resource = {
  format: string;
  url: string;
  describedBy: string;
};

export type DataSetRaw = {
  id: string;
  name: string;
  title: string;
  notes: string;
  metadata_modified: string;
  maintainer: string;
  organization: {
    title: string;
  };
  extras: { key: string; value: string | string[] }[];
  resources: Resource[];
};

export type DataSet = {
  id: string;
  name: string;
  title: string;
  description: string;
  metadata_modified_date: string;
  maintainer: string;
  downloadUrl: string;
  category: string | string[];
  orgTitle: string;
  columns?: GridColDef[] | null;
};

export type DataView = {
  id: string;
  name: string;
  assetType: string;
  attribution: string;
  category: string;
  description: string;
  displayType: string;
  dataTypeName: string;
  columns: Column[];
};

export type Column = {
  id: number;
  name: string;
  dataTypeName: string;
  description: string;
  fieldName: string;
  position: number;
  tableColumnId: number;
  format: object;
  flags?: string[];
};

export type Data = {
  meta: {
    view: DataView;
  };
  data: any[];
};
