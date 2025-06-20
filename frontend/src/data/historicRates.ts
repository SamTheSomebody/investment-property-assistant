//All groups CPI - https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/latest-release#key-statistics
export const inflationRate = [
  { year: 2016, value: (0.013 + 0.01 + 0.013 + 0.015) / 4 },
  { year: 2017, value: (0.021 + 0.019 + 0.018 + 0.019) / 4 },
  { year: 2018, value: (0.019 + 0.021 + 0.019 + 0.018) / 4 },
  { year: 2019, value: (0.013 + 0.016 + 0.017 + 0.018) / 4 },
  { year: 2020, value: (0.022 + -0.003 + 0.007 + 0.009) / 4 },
  { year: 2021, value: (0.011 + 0.038 + 0.03 + 0.035) / 4 },
  { year: 2022, value: (0.051 + 0.061 + 0.073 + 0.078) / 4 },
  { year: 2023, value: (0.07 + 0.06 + 0.054 + 0.041) / 4 },
  { year: 2024, value: (0.036 + 0.038 + 0.028 + 0.024) / 4 },
  { year: 2025, value: 0.024 },
];

//Cash Rate (inflation) - https://www.rba.gov.au/statistics/cash-rate/
export const cashRate = [
  { year: 2016, value: (0.02 + 0.02 + 0.0175 + 0.0175 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015) / 11 },
  { year: 2017, value: (0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015) / 11 },
  { year: 2018, value: (0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015 + 0.015) / 11 },
  { year: 2019, value: (0.015 + 0.015 + 0.015 + 0.015 + 0.0125 + 0.01 + 0.01 + 0.01 + 0.0075 + 0.0075 + 0.0075) / 11 },
  { year: 2020, value: (0.0075 + 0.005 + 0.0025 + 0.0025 + 0.0025 + 0.0025 + 0.0025 + 0.0025 + 0.0025 + 0.0025 + 0.001) / 11 },
  { year: 2021, value: (0.001 + 0.001 + 0.001 + 0.001 + 0.001 + 0.001 + 0.001 + 0.001 + 0.001 + 0.001 + 0.001) / 11 },
  { year: 2022, value: (0.001 + 0.0035 + 0.0085 + 0.0135 + 0.0185 + 0.0235 + 0.026 + 0.0285 + 0.031) / 9 },
  { year: 2023, value: (0.0335 + 0.036 + 0.036 + 0.0385 + 0.041 + 0.041 + 0.041 + 0.041 + 0.0435 + 0.0435 + 0.0435) / 11 },
  { year: 2024, value: (0.0435 + 0.0435 + 0.0435 + 0.0435 + 0.0435 + 0.0435 + 0.0435 + 0.0435) / 8 },
  { year: 2025, value: (0.041 + 0.041 + 0.0385) / 3 },
];

//Home Loan Lending Rate - https://www.rba.gov.au/statistics/interest-rates/
export const homeLoanLendingRate = [
  { year: 2016, value: 0 },
  { year: 2017, value: 0 },
  { year: 2018, value: 0 },
  { year: 2019, value: (0.038 + 0.038 + 0.038 + 0.037 + 0.037 + 0.036) / 6 },
  { year: 2020, value: (0.036 + 0.036 + 0.034 + 0.033 + 0.033 + 0.032 + 0.032 + 0.032 + 0.031 + 0.031 + 0.031 + 0.03) / 12 },
  { year: 2021, value: (0.03 + 0.03 + 0.029 + 0.029 + 0.029 + 0.028 + 0.028 + 0.028 + 0.027 + 0.027 + 0.027 + 0.027) / 12 },
  { year: 2022, value: (0.027 + 0.027 + 0.026 + 0.026 + 0.028 + 0.031 + 0.034 + 0.037 + 0.04 + 0.042 + 0.044 + 0.045) / 12 },
  { year: 2023, value: (0.045 + 0.047 + 0.049 + 0.049 + 0.051 + 0.054 + 0.054 + 0.055 + 0.055 + 0.056 + 0.058 + 0.059) / 12 },
  { year: 2024, value: (0.059 + 0.059 + 0.06 + 0.06 + 0.06 + 0.06 + 0.06 + 0.061 + 0.061 + 0.061 + 0.061 + 0.061) / 12 },
  { year: 2025, value: (0.061 + 0.06 + 0.06 + 0.06) / 4 },
];

export const asx = [
  { year: 2016, value: 0.1715 },
  { year: 2017, value: 0.1023 },
  { year: 2018, value: 0.0932 },
  { year: 2019, value: 0.3081 },
  { year: 2020, value: -0.0817 },
  { year: 2021, value: 0.2903 },
  { year: 2022, value: -0.267 },
  { year: 2023, value: -0.0753 },
  { year: 2024, value: 0.0333 },
  { year: 2025, value: 0.062 },
];

export const housePrice = [{ year: 2025, value: 0 }];
export const unitPrice = [{ year: 2025, value: 0 }];
export const apartmentPrice = [{ year: 2025, value: 0 }];

//Need history data for houses, units, apartments
//Would be good to have pre suburb too
