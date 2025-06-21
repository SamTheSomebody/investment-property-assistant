export function calculateStampDuty(propertyValue: number): number {
  switch (true) {
    case propertyValue <= 25000:
      return 0.014 * propertyValue;
    case propertyValue <= 130000:
      return 350 + 0.024 * (propertyValue - 25000);
    case propertyValue <= 960000:
      return 2870 + 0.06 * (propertyValue - 130000);
    case propertyValue <= 2000000:
      return 0.055 * propertyValue;
    default:
      return 110000 + 0.065 * (propertyValue - 2000000);
  }
}

export const stampDuty = {
  '$0–$25k': '1.4% of value',
  '$25k–$130k': '$350 + 2.4% over $25k',
  '$130k–$960k': '$2870 + 6% over $130k',
  '$960k–$2m': '5.5% of full value',
  '> $2m': '$110k + 6.5% over $2M',
};
