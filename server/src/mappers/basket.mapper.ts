import { Basket, BasketItem } from '../api/magnetsServer/generated';
import { BasketDocument } from '../models/Basket.model';

function mapBasketDocumentToBasket(basket: BasketDocument): Basket {
  return {
    _id: basket._id,
    userId: basket.userId,
    products: basket.products.map((item) => ({
      product: item.productId,
      priceAndSizesArray: item.priceAndSizesArray,
      totalPrice: item.totalPrice,
    })) as unknown as BasketItem[],
    totalQuantity: basket.totalQuantity,
    totalPrice: basket.totalPrice,
  } as Basket;
}

export default {
  mapBasketDocumentToBasket,
};
