export type PropertyType = 'House' | 'Townhouse' | 'Apartment';

export type Property = {
  address: string;
  suburb: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  squareMeters: number;
  price: { min: number; max: number; expected?: number };
  rent: { min: number; max: number; expected?: number };
  strataFees?: number;
  councilRates?: number;
  waterRates?: number;
  homeInsurance?: number;
  landlordInsurance?: number;
  imageUrl?: string;
};
