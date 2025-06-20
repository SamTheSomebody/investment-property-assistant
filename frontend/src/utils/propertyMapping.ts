import { PropertyData } from "../types";

export function toCamelCaseProperty(p: any): PropertyData {
  return {
    address: p.address,
    suburb: p.suburb,
    propertyType: p.property_type,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    carSpaces: p.car_spaces,
    squareMeters: p.square_meters,
    priceMin: p.price_min,
    priceMax: p.price_max,
    annualRentMin: p.annual_rent_min,
    annualRentMax: p.annual_rent_max,
    expectedPrice: p.expected_price,
    expectedRentalIncome: p.expected_rental_income,
    strataFees: p.strata_fees,
    councilRates: p.council_rates,
    waterRates: p.water_rates,
    homeInsurance: p.home_insurance,
    landlordInsurance: p.landlord_insurance,
    imageUrl: p.image_url,
  };
}