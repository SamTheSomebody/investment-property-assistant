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
  imageUrl?: string;
};

export type GlobalValues = {
  initalInvestment: number; //$120,000 - 0 to $1m range
  inflation: number; //3.5% - 0 to 20 range
  asx: number; //9% - 0 to 20 range
  interest: number; //4.25% - 0 to 20 range
  unforeseenYearlyCosts: number; //$2000 - 0 to $20k range
  landTax: (landValue: number) => number; //Togglable view with text and table
  stampDuty: (purchasePrice: number) => number; //Togglable view with text and table
  conveyancingFees: number; //avg $500 - $2200, can be 0
  inspectionFees: number; //avg $400 - $500, can be 0
  registrationOfTitle: number; //$119
  additionalFees: number; // $1000 - 0 to $100k range
  vacancyRates: number; // 2% - 0 to 25% range
  rentalFees: number; // 7% - 0 to 15% range
};
