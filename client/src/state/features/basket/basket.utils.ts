import {
  BasketItem,
  BasketItemUpdateData,
} from '../../../api/magnetsServer/generated';
import magnetsServerApi from '../../../api/magnetsServer/magnetsServer.api.config';
import { parameters } from '../../../config/parameters';
import { BasketData } from './basket.interfaces';

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

async function updateBasket(
  userId: string | undefined,
  basket: BasketData
): Promise<void> {
  if (userId) {
    const updatedProductsPayload = basket.products.map(
      (product) =>
        ({
          productId: product.product.id,
          priceAndSizesArray: product.priceAndSizesArray.map((ps) => ({
            itemId: ps.item.id,
            quantity: ps.quantity,
            totalPrice: ps.totalPrice,
          })),
          totalPrice: product.totalPrice,
        } as BasketItemUpdateData)
    );
    const payload = {
      products: updatedProductsPayload,
      totalPrice: basket.totalPrice,
      totalQuantity: basket.totalQuantity,
    };
    await magnetsServerApi.basketService.updateBasket(payload, userId);
  } else {
    localStorage.setItem(
      parameters.localStorages.basket,
      JSON.stringify(basket)
    );
  }
}

export default {
  calculateTotalQuantity,
  calculateTotalBasketPrice,
  getNewItemQuantity,
  calculateTotalBasketItemPrice,
  updateBasket,
};
