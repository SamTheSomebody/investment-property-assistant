export type PropertyCosts = {
  strataFees?: number;
  councilRates?: number;
  waterRates?: number;
  //landTax?: number; calculated as a factor of cost
  homeInsurance?: number;
  landlordInsurance?: number;
};

export type ProperyData = {
  address: string;
  suburb: string;
  propertyType: "House" | "Townhouse" | "Apartment";
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  squareMeters: number;
  priceMin: number;
  priceMax: number;
  expectedPrice?: number;
  expectedRentalIncome?: number;
  annualRentalIncomeMin?: number;
  annualRentalIncomeMax?: number;
  costs: PropertyCosts;
};
