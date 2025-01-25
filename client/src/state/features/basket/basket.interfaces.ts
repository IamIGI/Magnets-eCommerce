import { Basket, Product } from '../../../api/magnetsServer/generated';
import { FetchStatus } from '../../../interfaces/global';

export interface AddToBasket {
  product: Product;
  quantity: number;
  priceAndSizeId: string;
}

export type BasketData = Omit<Basket, 'id' | 'userId'>;
export interface BasketState {
  data: BasketData;
  fetchStatus: FetchStatus;
}
