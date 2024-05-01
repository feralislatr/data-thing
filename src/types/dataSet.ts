export type DataSet = {
  id: string;
  name: string;
  title: string;
  notes: string;
  metadata_modified: string;
  maintainer: string;
  resources: [
    {
      format: string;
      url: string;
      describedBy: string;
    },
  ];
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
};

export type Data = {
  meta: {
    view: {
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
  };
  data: any[];
};
