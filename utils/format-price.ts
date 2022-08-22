const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatPrice = (price: number) => {
  return formatter.format(price).replace('.', 'k').replace(/,/, '.').replace(/k/g, ',');;  
};