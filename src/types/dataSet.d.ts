export type Resource = {
  format: string;
  url: string;
  describedBy: string;
};

// rename to DataView
export type DataSet = {
  id: string;
  name: string;
  title: string;
  notes: string;
  metadata_modified: string;
  maintainer: string;
  extras: { key: string; value: string }[];
  resources: Resource[];
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

// delete this
export type DataView = {
  id: string;
  dataSetId: string;
  name: string;
  assetType: string;
  attribution: string;
  category: string;
  description: string;
  displayType: string;
  dataTypeName: string;
  columns: Column[];
};

export type Data = {
  meta: {
    view: DataView;
  };
  data: any[];
};
