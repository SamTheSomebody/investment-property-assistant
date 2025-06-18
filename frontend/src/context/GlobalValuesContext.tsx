import React, { createContext, useContext, useState } from "react";
import { GlobalValues } from "../types";

const defaultValues: GlobalValues = {
  initalInvestment: 120000,
  inflation: 0.035,
  asx: 0.09,
  interest: 0.045,
  stampDuty: calculateStampDuty,
  conveyancingFees: 1350,
  inspectionFees: 450,
  registrationOfTitle: 119,
  additionalFees: 0,
  vacancyRates: 0.02,
  rentalFees: 0.07,
  unforeseenYearlyCosts: 1000,
  landTax: calculateLandTax,
};


type GlobalValuesContextType = {
  values: GlobalValues;
  setValues: React.Dispatch<React.SetStateAction<GlobalValues>>;
};

const GlobalValuesContext = createContext<GlobalValuesContextType | undefined>(undefined);

export const GlobalValuesProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<GlobalValues>(defaultValues);

  return (
    <GlobalValuesContext.Provider value={{ values, setValues }}>
      {children}
    </GlobalValuesContext.Provider>
  );
};

export const useGlobalValues = (): GlobalValuesContextType => {
  const context = useContext(GlobalValuesContext);
  if (context === undefined) {
    throw new Error("useGlobalValues must be used within a GlobalValuesProvider");
  }
  return context;
};

function calculateLandTax(landValue: number): number {
  switch (true) {
    case landValue < 50000:
      return 0;
    case landValue < 100000:
      return 500;
    case landValue < 300000:
      return 975;
    case landValue < 600000:
      return 1350 + 0.003 * (landValue - 300000);
    case landValue < 1000000:
      return 2250 + 0.006 * (landValue - 600000);
    case landValue < 1800000:
      return 4650 + 0.009 * (landValue - 1000000);
    case landValue < 3000000:
      return 11850 + 0.0165 * (landValue - 1800000);
    default:
      return 31650 + 0.0265 * (landValue - 3000000);
  }
}

function calculateStampDuty(propertyValue: number): number {
  switch (true) {
    case propertyValue <= 25000:
      return 0.014 * propertyValue;
    case propertyValue <= 130000:
      return 350 + 0.024 * (propertyValue - 25000);
    case propertyValue <= 960000:
      return 2870 + 0.06 * (propertyValue - 130000);
    case propertyValue <= 2000000:
      return 0.055 * propertyValue;
    default:
      return 110000 + 0.065 * (propertyValue - 2000000);
  }
}
