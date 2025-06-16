import { PropertyData } from "./types"

export const ICONS_LARGE = "material-symbols-outlined text-6xl text-purple";
export const ICONS = "material-symbols-outlined text-3xl text-purple";

export const sampleListings: PropertyData[] = [
  {
    address: "123 Test Street",
    suburb: "Fitzroy",
    propertyType: "Townhouse",
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    squareMeters: 120,
    priceMin: 900000,
    priceMax: 950000,
    annualRentMin: 36400,
    annualRentMax: 42350,
    expectedPrice: 920000,
    expectedRentalIncome: 40000,
    costs: {
      strataFees: 1500,
      councilRates: 1200,
      homeInsurance: 800,
    },
  },
  {
    address: "45 Ocean View Road",
    suburb: "Bondi",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 1,
    squareMeters: 85,
    priceMin: 750000,
    priceMax: 800000,
    annualRentMin: 32240,
    annualRentMax: 36450,
    expectedPrice: 770000,
    expectedRentalIncome: 34500,
    costs: {
      strataFees: 2200,
      councilRates: 950,
      waterRates: 650,
    },
  },
  {
    address: "10 Riverbend Crescent",
    suburb: "Ivanhoe",
    propertyType: "House",
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    squareMeters: 230,
    priceMin: 1300000,
    priceMax: 1400000,
    annualRentMin: 45760,
    annualRentMax: 45820,
    expectedRentalIncome: 45790,
    costs: {
      councilRates: 1500,
      homeInsurance: 1200,
      landlordInsurance: 600,
    },
  },
];
