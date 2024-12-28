import { ListItem } from '../interfaces/cart';

function calculatePrice(
  SIZES_ARR: ListItem[],
  QUANTITY_ARR: ListItem[],
  sizeId: string,
  quantityId: string
) {
  const sizePrice = SIZES_ARR.find((s) => s.id === sizeId)?.price;
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
