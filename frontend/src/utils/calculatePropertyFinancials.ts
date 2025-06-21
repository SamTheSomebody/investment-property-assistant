import { Property } from '../types/property';
import { AdjustableValues } from '../types/adjustableValues';
import { calculateStampDuty } from '../data/stampDuty';
import { calculateLandTax } from '../data/landTax';

export type PropertyFinancials = {
  principle: number;
  value: number;
  debt: number;
  interest: number;
  strataFees: number;
  councilRates: number;
  waterRates: number;
  landTax: number;
  homeInsurance: number;
  landlordInsurance: number;
  unforeseenCosts: number;
  totalCosts: number;
  rent: number;
  vacancyCosts: number;
  rentalFees: number;
  totalIncome: number;
  profitLoss: number;
  netWorth: number;
};

export function calculatePurchaseCost(purchasePrice: number, adjustableValues: AdjustableValues): number {
  return calculateStampDuty(purchasePrice) + adjustableValues.conveyancingFees + adjustableValues.inspectionFees + adjustableValues.additionalFees + adjustableValues.registrationOfTitle;
}

export function calculateInitialPrinciple(price: number, globalValues: AdjustableValues): number {
  const purchaseCost = calculatePurchaseCost(price, globalValues);
  return Math.min(globalValues.initalInvestment - purchaseCost, price);
}

export function calculatePropertyValues(price: number, principle: number, rent: number, property: Property, adjustableValues: AdjustableValues): PropertyFinancials {
  const value = price * (1 + adjustableValues.expectedHousePriceRateChange);
  const debt = price - principle;
  const interest = debt * adjustableValues.interest;

  const strataFees = -(property.strataFees ?? 0);
  const councilRates = -(property.councilRates ?? 0);
  const waterRates = -(property.waterRates ?? 0);
  const landTax = -(calculateLandTax(price / 4) ?? 0); //TODO how is land tax calucated
  const homeInsurance = -(property.homeInsurance ?? 0);
  const landlordInsurance = property.landlordInsurance ?? 0;
  const unforeseenCosts = -(adjustableValues.unforeseenYearlyCosts ?? 0);

  const totalCosts = interest + strataFees + councilRates + waterRates + landTax + homeInsurance + landlordInsurance + unforeseenCosts;

  const vacancyCosts = -rent * adjustableValues.vacancyRates;
  const rentalFees = -rent * adjustableValues.rentalFees;

  const totalIncome = rent + vacancyCosts + rentalFees + adjustableValues.additionalAnnualInvestment;
  const profitLoss = totalIncome + totalCosts;
  const netWorth = price + profitLoss;

  return {
    principle,
    value,
    debt,
    interest,
    strataFees,
    councilRates,
    waterRates,
    landTax,
    homeInsurance,
    landlordInsurance,
    unforeseenCosts,
    totalCosts,
    rent,
    vacancyCosts,
    rentalFees,
    totalIncome,
    profitLoss,
    netWorth,
  };
}
