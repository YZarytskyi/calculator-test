export const minPrice = (price: number, prices: number[]) => {
  const availablePrices = prices.filter((price) => price !== 0);
  if (price === Math.min(...availablePrices)) {
    return true;
  }
  return false;
};

export const chartInputWidth = (price: number, prices: number[]) =>
  (price * 100) / Math.max(...prices);

export const setPriceByGB = (value: number) => (value > 75 ? value - 75 : 0);
