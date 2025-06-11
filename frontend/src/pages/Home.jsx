import PropertyCard from "../components/PropertyCard";

const sampleListings= [
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
    expectedPrice: 920000,
    expectedRentalIncome: 700,
    annualRentalIncome: 36400,
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
    expectedPrice: 770000,
    expectedRentalIncome: 620,
    annualRentalIncome: 32240,
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
    expectedRentalIncome: 880,
    annualRentalIncome: 45760,
    costs: {
      councilRates: 1500,
      landTax: 1700,
      homeInsurance: 1200,
      landlordInsurance: 600,
    },
  },
];


export default function Home() {
  return (
    <div className="grid gap-4 p-4">
    {sampleListings.map((p,i) => (
      <PropertyCard key={i} data={p} />
    ))}
    </div>
  );
}
