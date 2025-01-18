import { BasketItem } from './basket.slice';

function calculateTotalQuantity(basketItems: BasketItem[]): number {
  return basketItems.reduce(
    (basketQuantity, basketItem) =>
      basketQuantity +
      basketItem.priceAndSizes.reduce(
        (psQuantity, ps) => psQuantity + ps.quantity,
        0
      ),
    0
  );
}

function calculateTotalPrice(basketItems: BasketItem[]): number {
  return basketItems.reduce(
    (basketPrice, basketItem) =>
      basketPrice +
      basketItem.priceAndSizes.reduce(
        (psPrice, ps) => psPrice + ps.quantity * ps.priceAndSizeData.price,
        0
      ),
    0
  );
}

export default {
  calculateTotalQuantity,
  calculateTotalPrice,
};
