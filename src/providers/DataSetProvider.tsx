'use client';
import { createContext, useContext, useState } from 'react';

const DataSetContext = createContext(null);

export default function DataSetProvider({ children }) {
  const [dataSet, setDataSet] = useState(null);
  return (
    <DataSetContext.Provider
      value={{
        dataSet,
        setDataSet,
      }}
    >
      {children}
    </DataSetContext.Provider>
  );
}

export function useDataSetContext() {
  return useContext(DataSetContext);
}
