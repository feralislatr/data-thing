'use client';
import { createContext, useContext, useState } from "react";

const DataSetContext = createContext(null);

export default function DataSetProvider({ children }) {
  const [dataSetList, setDataSetList] = useState(null);
  const [dataSet, setDataSet] = useState(null);
  return (
    <DataSetContext.Provider
      value={{
        dataSetList,
        setDataSetList,
        dataSet,
        setDataSet,
      }}>
      {children}
    </DataSetContext.Provider>
  );
}

export function useDataSetContext() {
  return useContext(DataSetContext);
}
