export type PropertyCosts = {
  strataFees?: number;
  councilRates?: number;
  waterRates?: number;
  //landTax?: number; calculated as a factor of cost
  homeInsurance?: number;
  landlordInsurance?: number;
};

export type PropertyType = "House" | "Townhouse" | "Apartment";

export type PropertyData = {
  address: string;
  suburb: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  squareMeters: number;
  priceMin: number;
  priceMax: number;
  annualRentMin: number;
  annualRentMax: number;
  expectedPrice?: number;
  expectedRentalIncome?: number;
  costs: PropertyCosts;
};
