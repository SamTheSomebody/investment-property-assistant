import { asx, cashRate, inflationRate, housePrice, unitPrice, apartmentPrice, homeLoanLendingRate } from '../data/historicRates';
import { useGlobalValues } from '../context/GlobalValuesContext';
import { PropertyData } from '../types';

const propertyGrowthRate = 0.05;

function getHistoricRate(arr: { year: number; value: number }[], year: number): number {
  return arr.find((r) => r.year === year)?.value ?? 0;
}

export type YearlyPropertyData = {
  year: number;
  asx: number;
  cashRate: number;
  inflation: number;
  housePrice: number;
  unitPrice: number;
  apartmentPrice: number;
  loan: number;
};

export function calculatePropertyData(data: PropertyData | null | undefined): YearlyPropertyData[] {
  const globalContext = useGlobalValues();
  if (!globalContext) return [];
  const global = globalContext.values;
  const x = global.initalInvestment;

  const result: YearlyPropertyData[] = [];

  let current = {
    asx: x,
    cashRate: x,
    inflation: x,
    housePrice: x,
    unitPrice: x,
    apartmentPrice: x,
    loan: x,
  };

  result[10] = { year: 0, ...current };

  for (let i = 9; i >= 0; i--) {
    const year = i - 10;
    const y = 2025 + year;

    current = {
      asx: current.asx / (1 + getHistoricRate(asx, y)),
      cashRate: current.cashRate / (1 + getHistoricRate(cashRate, y)),
      inflation: current.inflation / (1 + getHistoricRate(inflationRate, y)),
      housePrice: current.housePrice / (1 + getHistoricRate(housePrice, y)),
      unitPrice: current.unitPrice / (1 + getHistoricRate(unitPrice, y)),
      apartmentPrice: current.apartmentPrice / (1 + getHistoricRate(apartmentPrice, y)),
      loan: current.loan / (1 + getHistoricRate(homeLoanLendingRate, y)),
    };

    result[i] = {
      year: year,
      asx: Math.round(current.asx),
      cashRate: Math.round(current.cashRate),
      inflation: Math.round(current.inflation),
      housePrice: Math.round(current.housePrice),
      unitPrice: Math.round(current.unitPrice),
      apartmentPrice: Math.round(current.apartmentPrice),
      loan: Math.round(current.loan),
    };
  }

  current = { ...result[10] };

  for (let i = 11; i < 31; i++) {
    const year = i - 10;
    current = {
      asx: current.asx * (1 + global.asx),
      cashRate: current.cashRate * (1 + global.inflation),
      inflation: current.inflation * (1 + global.inflation),
      housePrice: current.housePrice * (1 + propertyGrowthRate),
      unitPrice: current.unitPrice * (1 + propertyGrowthRate),
      apartmentPrice: current.apartmentPrice * (1 + propertyGrowthRate),
      loan: current.loan * (1 + global.inflation),
    };
    result[i] = {
      year,
      asx: Math.round(current.asx),
      cashRate: Math.round(current.cashRate),
      inflation: Math.round(current.inflation),
      housePrice: Math.round(current.housePrice),
      unitPrice: Math.round(current.unitPrice),
      apartmentPrice: Math.round(current.apartmentPrice),
      loan: Math.round(current.loan),
    };
  }

  return result;
}

//TODO calculate year on year effects of costs and values
