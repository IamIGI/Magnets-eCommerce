import { PriceAndSizes } from '../api/magnetsServer/generated';

function calculatePrice(
  priceAndSizes: PriceAndSizes[],
  quantity: number,
  sizeId: string
) {
  const sizePrice = priceAndSizes.find((s) => s.id === sizeId)?.price;

  if (sizePrice) {
    return sizePrice * quantity;
  }
  return 0;
}

function displayPrice(price: number) {
  return price.toFixed(2);
}

export default { calculatePrice, displayPrice };
