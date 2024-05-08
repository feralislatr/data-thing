'use client';
import { createContext, useContext, useState } from 'react';

const DataSetContext = createContext(null);

export default function DataSetProvider({ children }) {
  const [dataSet, setDataSet] = useState(null);
  const [dataColumns, setDataColumns] = useState(null);
  const [dataRows, setDataRows] = useState(null);
  return (
    <DataSetContext.Provider
      value={{
        dataSet,
        setDataSet,
        dataColumns,
        setDataColumns,
        dataRows,
        setDataRows,
      }}
    >
      {children}
    </DataSetContext.Provider>
  );
}

export function useDataSetContext() {
  return useContext(DataSetContext);
}
