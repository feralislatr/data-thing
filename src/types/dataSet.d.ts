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
  extras: { key: string; value: string }[];
  resources: Resource[];
};

export type DataSet = {
  id: string;
  /* also collection name of data */
  name: string;
  title: string;
  description: string;
  metadata_modified_date: string;
  maintainer: string;
  downloadUrl: string;
  category: string;
  orgTitle: string;
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

// delete this later
export type Data = {
  meta: {
    view: DataView;
  };
  data: any[];
};
