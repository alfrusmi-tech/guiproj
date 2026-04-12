const USD_TO_LKR_RATE = 320

export function convertToLKR(usdPrice: number): string {
  const lkrPrice = usdPrice * USD_TO_LKR_RATE
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(lkrPrice)
}