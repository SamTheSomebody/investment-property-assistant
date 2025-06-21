import { asx, cashRate, inflationRate, housePrice, unitPrice, apartmentPrice, homeLoanLendingRate } from '../data/historicRates';
import { useAdjustableValues } from '../context/AdjustableValuesContext';

function getHistoricRate(arr: { year: number; value: number }[], year: number): number {
  return arr.find((r) => r.year === year)?.value ?? 0;
}

export function calculateYearlyData(): { [key: string]: number }[] {
  const globalContext = useAdjustableValues();
  if (!globalContext) return [];
  const global = globalContext.values;
  const x = global.initalInvestment;

  let current: { [key: string]: number } = {
    asx: x,
    cashRate: x,
    inflation: x,
    housePrice: x,
    unitPrice: x,
    apartmentPrice: x,
    loan: x,
    networth: x, //TODO this needs to be the value from the valuation table
  };

  const result: { [key: string]: number }[] = [];
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
      networth: x,
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
      networth: Math.round(current.networth),
    };
  }

  current = { ...result[10] };

  for (let i = 11; i < 31; i++) {
    const year = i - 10;
    const r = global.additionalAnnualInvestment;
    current = {
      asx: current.asx * (1 + r['asx']),
      cashRate: current.cashRate * (1 + r['inflation']),
      inflation: current.inflation * (1 + r['inflation']),
      housePrice: current.housePrice * (1 + r['propertyGrowthRate']),
      unitPrice: current.unitPrice * (1 + r['propertyGrowthRate']),
      apartmentPrice: current.apartmentPrice * (1 + r['propertyGrowthRate']),
      loan: current.loan * (1 + r['interest']),
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
