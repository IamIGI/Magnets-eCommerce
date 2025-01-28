import { BasketUpdateData } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS } from '../config/MongoDB.config';
import basketMapper from '../mappers/basket.mapper';
import BasketModel, {
  BasketDocument,
  BasketUpdateDocument,
} from '../models/Basket.model';
import { HttpStatusCode } from '../constants/error.constants';
import appAssert from '../utils/appErrorAssert.utils';

const SERVICE_NAME = DB_COLLECTIONS.Baskets;

async function applyBasketPopulation<T>(query: any): Promise<T> {
  return query
    .populate({
      path: 'products.productId',
      model: DB_COLLECTIONS.Products,
      populate: [
        {
          path: 'categoryId',
          model: DB_COLLECTIONS.ProductCategories,
        },
        {
          path: 'pricesAndSizesIds',
          model: DB_COLLECTIONS.PricesAndSizes,
        },
      ],
    })
    .populate({
      path: 'products.priceAndSizesArray.itemId',
      model: DB_COLLECTIONS.PricesAndSizes,
    });
}

const getByUserId = async (id: string) => {
  const basket = await applyBasketPopulation<BasketDocument>(
    BasketModel.findOne({ userId: id })
  );

  appAssert(
    basket,
    HttpStatusCode.NotFound,
    `Not found. UserId: ${id}`,
    SERVICE_NAME
  );

  return basketMapper.mapBasketDocumentToBasket(basket);
};

const create = async (userId: string) => {
  try {
    const isUserHaveBasket = await BasketModel.findOne({ userId });

    appAssert(
      !isUserHaveBasket,
      HttpStatusCode.NotFound,
      `User already have basket, userId: ${userId}`,
      SERVICE_NAME
    );

    const newBasket: BasketUpdateDocument = {
      userId,
      products: [],
      totalPrice: 0,
      totalQuantity: 0,
    };

    await new BasketModel(newBasket).save();
    return newBasket;
  } catch (err: any) {
    throw err;
  }
};

const updateByUserId = async (id: string, data: BasketUpdateData) => {
  try {
    const updatedBasket = await applyBasketPopulation<BasketDocument>(
      BasketModel.findOneAndUpdate(
        { userId: id },
        { $set: data },
        { new: true, runValidators: true }
      )
    );

    appAssert(
      updatedBasket,
      HttpStatusCode.NotFound,
      `Not found. UserId: ${id}`,
      SERVICE_NAME
    );

    return basketMapper.mapBasketDocumentToBasket(updatedBasket);
  } catch (err: any) {
    throw err;
  }
};

const removeByUserId = async (id: string): Promise<void> => {
  try {
    const result = await BasketModel.deleteOne({ userId: id });

    appAssert(
      result.deletedCount > 0,
      HttpStatusCode.NotFound,
      `Not found, UserId: ${id}`,
      SERVICE_NAME
    );
  } catch (err: any) {
    throw err;
  }
};

export default {
  getByUserId,
  create,
  updateByUserId,
  removeByUserId,
};
