import {
  Basket,
  BasketItem,
  BasketItemPriceAndSizesArrayInner,
  PriceAndSizes,
  Product,
  ProductCategory,
  ProductUpdateData,
} from '../api/magnetsServer/generated';
import { BasketDocument } from '../models/Basket.model';
import { PriceAndSizesDocument } from '../models/PricesAndSizes.model';
import { ProductDocument } from '../models/Products.model';

interface PopulatedPricesAndSizes {
  itemId: PriceAndSizes;
  quantity: number;
  totalPrice: number;
}

function mapBasketDocumentToBasket(basket: BasketDocument): Basket {
  const getProduct = (product: ProductDocument): Product => {
    return {
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.categoryId as unknown as ProductCategory,
      imgNames: product.imgNames,
      isUserImageRequired: product.isUserImageRequired,
      createDate: product.createDate,
      editDate: product.editDate,
      isRemoved: product.isRemoved,
      pricesAndSizes: product.pricesAndSizesIds as unknown as PriceAndSizes[],
    };
  };

  const getPriceAndSize = (
    priceAndSizes: PopulatedPricesAndSizes[]
  ): BasketItemPriceAndSizesArrayInner[] => {
    return priceAndSizes.map((ps) => ({
      item: ps.itemId,
      quantity: ps.quantity,
      totalPrice: ps.totalPrice,
    }));
  };

  console.log(basket);
  return {
    _id: basket._id,
    userId: basket.userId,
    products: basket.products.map(
      (item) =>
        ({
          product: getProduct(item.productId as unknown as ProductDocument),
          priceAndSizesArray: getPriceAndSize(
            item.priceAndSizesArray as unknown as PopulatedPricesAndSizes[]
          ),
          totalPrice: item.totalPrice,
        } as BasketItem)
    ) as unknown as BasketItem[],
    totalQuantity: basket.totalQuantity,
    totalPrice: basket.totalPrice,
  } as Basket;
}

export default {
  mapBasketDocumentToBasket,
};
