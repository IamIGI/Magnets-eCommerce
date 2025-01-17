import { PriceAndSizes } from '../api/magnetsServer/generated';
import { ListItem } from '../interfaces/cart';

function calculatePrice(
  priceAndSizes: PriceAndSizes[],
  QUANTITY_ARR: ListItem[],
  sizeId: string,
  quantityId: string
) {
  const sizePrice = priceAndSizes.find((s) => s.id === sizeId)?.price;
  const quantityValue = QUANTITY_ARR.find((q) => q.id === quantityId)?.desc;

  if (sizePrice && quantityValue) {
    return sizePrice * Number(quantityValue);
  }
  return 0;
}

function displayPrice(price: number) {
  return price.toFixed(2);
}

export default { calculatePrice, displayPrice };
