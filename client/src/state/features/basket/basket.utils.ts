import { BasketItem } from '../../../api/magnetsServer/generated';

function calculateTotalQuantity(basketItems: BasketItem[]): number {
  return basketItems.reduce(
    (basketQuantity, basketItem) =>
      basketQuantity +
      basketItem.priceAndSizesArray.reduce(
        (psQuantity, ps) => psQuantity + ps.quantity,
        0
      ),
    0
  );
}

function calculateTotalBasketPrice(basketItems: BasketItem[]): number {
  return basketItems.reduce(
    (basketPrice, basketItem) =>
      basketPrice +
      basketItem.priceAndSizesArray.reduce(
        (psPrice, ps) => psPrice + ps.quantity * ps.item.price,
        0
      ),
    0
  );
}

function calculateTotalBasketItemPrice(basketItem: BasketItem): number {
  return basketItem.priceAndSizesArray.reduce(
    (itemPrice, psItem) => itemPrice + psItem.totalPrice,
    0
  );
}

function getNewItemQuantity(
  quantity_arr: number[],
  previousQuantity: number,
  operation: '+' | '-'
): number {
  const previousQuantityIndex = quantity_arr.findIndex(
    (q) => q === previousQuantity
  );

  if (previousQuantityIndex !== -1) {
    if (operation === '-' && previousQuantityIndex > 0) {
      return quantity_arr[previousQuantityIndex - 1];
    }
    if (operation === '+' && previousQuantityIndex < quantity_arr.length - 1)
      return quantity_arr[previousQuantityIndex + 1];
  } else {
    console.error('Could not found given quantity in array');
  }

  return previousQuantity;
}

export default {
  calculateTotalQuantity,
  calculateTotalBasketPrice,
  getNewItemQuantity,
  calculateTotalBasketItemPrice,
};
