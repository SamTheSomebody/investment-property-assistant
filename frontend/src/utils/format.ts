export function formatCurrency(value: number, decimals = 2): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(decimals)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(decimals)}K`;
  }
  return `$${value.toFixed(decimals).toLocaleString()}`;
}
