export type AdjustableValues = {
  initalInvestment: number; //$120,000 - 0 to $1m range
  additionalAnnualInvestment: number; //$10,000 - 0 to $100k range
  inflation: number; //3.5% - 0 to 20 range
  asx: number; //9% - 0 to 20 range
  interest: number; //4.25% - 0 to 20 range
  conveyancingFees: number; //avg $500 - $2200, can be 0
  inspectionFees: number; //avg $400 - $500, can be 0
  registrationOfTitle: number; //$119
  additionalFees: number; // $1000 - 0 to $100k range
  vacancyRates: number; // 2% - 0 to 25% range
  rentalFees: number; // 7% - 0 to 15% range
  unforeseenYearlyCosts: number; //$2000 - 0 to $20k range
  expectedStrataRateChange: number;
  expectedAnnualInvestmentRateChange: number;
  expectedHousePriceRateChange: number;
  expectedUnitPriceRateChange: number;
  expectedApartmentPriceRateChange: number;
  expectedInterestRateChange: number;
  expectedInflationRateChange: number;
};

export const DEFAULT_ADJUSTABLE_VALUES: AdjustableValues = {
  initalInvestment: 120000,
  additionalAnnualInvestment: 10000,
  inflation: 0.0325,
  asx: 0.09,
  interest: 0.045,
  conveyancingFees: 1350,
  inspectionFees: 450,
  registrationOfTitle: 119,
  additionalFees: 0,
  vacancyRates: 0.02,
  rentalFees: 0.07,
  unforeseenYearlyCosts: 1000,
  expectedStrataRateChange: 0.02,
  expectedAnnualInvestmentRateChange: 0.02,
  expectedHousePriceRateChange: 0.02,
  expectedUnitPriceRateChange: 0.02,
  expectedApartmentPriceRateChange: 0.02,
  expectedInterestRateChange: 0.02,
  expectedInflationRateChange: 0.02,
};
