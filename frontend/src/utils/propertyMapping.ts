import { Property } from '../types/property';

export function toCamelCaseProperty(p: any): Property {
  return {
    address: p.address,
    suburb: p.suburb,
    propertyType: p.property_type,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    carSpaces: p.car_spaces,
    squareMeters: p.square_meters,
    price: { min: p.price_min, max: p.price_max, expected: p.expected_price },
    rent: { min: p.annual_rent_min, max: p.annual_rent_max, expected: p.expected_rental_income },
    strataFees: p.strata_fees,
    councilRates: p.council_rates,
    waterRates: p.water_rates,
    homeInsurance: p.home_insurance,
    landlordInsurance: p.landlord_insurance,
    imageUrl: p.image_url,
  };
}
