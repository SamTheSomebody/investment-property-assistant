import React, { createContext, useContext, useState } from 'react';
import { AdjustableValues, DEFAULT_ADJUSTABLE_VALUES } from '../types/adjustableValues';

type AdjustableValuesContextType = {
  values: AdjustableValues;
  setValues: React.Dispatch<React.SetStateAction<AdjustableValues>>;
};

const AdjustableValuesContext = createContext<AdjustableValuesContextType | undefined>(undefined);

export const AdjustableValuesProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<AdjustableValues>(DEFAULT_ADJUSTABLE_VALUES);
  return <AdjustableValuesContext.Provider value={{ values, setValues }}>{children}</AdjustableValuesContext.Provider>;
};

export const useAdjustableValues = (): AdjustableValuesContextType => {
  const context = useContext(AdjustableValuesContext);
  if (context === undefined) {
    throw new Error('useGlobalValues must be used within a GlobalValuesProvider');
  }
  return context;
};
