import { Basket, Product } from '../../../api/magnetsServer/generated';
import { FetchStatus } from '../../../interfaces/global';

export type BasketData = Omit<Basket, 'id' | 'userId'>;
export interface BasketState {
  data: BasketData;
  fetchStatus: FetchStatus;
}
export interface AddToBasket {
  product: Product;
  quantity: number;
  priceAndSizeId: string;
}

export interface ChangeBasketItemQuantity {
  productId: string;
  priceAndSizeId: string;
  operation: '+' | '-';
}
export interface RemoveBasketItemSize {
  productId: string;
  priceAndSizeId: string;
}
