export function calculateLandTax(landValue: number): number {
  switch (true) {
    case landValue < 50000:
      return 0;
    case landValue < 100000:
      return 500;
    case landValue < 300000:
      return 975;
    case landValue < 600000:
      return 1350 + 0.003 * (landValue - 300000);
    case landValue < 1000000:
      return 2250 + 0.006 * (landValue - 600000);
    case landValue < 1800000:
      return 4650 + 0.009 * (landValue - 1000000);
    case landValue < 3000000:
      return 11850 + 0.0165 * (landValue - 1800000);
    default:
      return 31650 + 0.0265 * (landValue - 3000000);
  }
}

export const landTax = {
  '< $50k': 'Nil',
  '$50k–$100k': '$500',
  '$100k–$300k': '$975',
  '$300k–$600k': '$1350 + 0.3% > $300k',
  '$600k–$1m': '$2250 + 0.6% > $600k',
  '$1m–$1.8m': '$4650 + 0.9% > $1m',
  '$1.8m–$3m': '$11,850 + 1.65% > $1.8m',
  '> $3m': '$31,650 + 2.65% > $3M',
};
