export type DataSet = {
  id: string,
  name: string,
  title: string,
  notes: string,
  metadata_modified: string,
  maintainer: string,
  resources: [{
    format: string,
    url: string,
    describedBy: string,
  }],
};
