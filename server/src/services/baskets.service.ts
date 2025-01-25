import { BasketUpdateData } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS } from '../config/MongoDBConfig';
import { createCustomError } from '../handlers/error.handler';
import basketMapper from '../mappers/basket.mapper';
import BasketModel, {
  BasketDocument,
  BasketUpdateDocument,
} from '../models/Basket.model';
import { HttpStatusCode } from '../types/error.type';

const SERVICE_NAME = 'Baskets';

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
  try {
    const data = await applyBasketPopulation<BasketDocument>(
      BasketModel.findOne({ userId: id })
    ).then((basket) => {
      if (!basket) {
        throw createCustomError(
          HttpStatusCode.NotFound,
          SERVICE_NAME,
          `Not found. UserId: ${id}`
        );
      }

      return basketMapper.mapBasketDocumentToBasket(basket);
    });

    return data;
  } catch (err: any) {
    throw err;
  }
};

const create = async (userId: string) => {
  try {
    const isDataExists = await BasketModel.findOne({ userId });
    if (isDataExists) {
      throw createCustomError(
        HttpStatusCode.NotFound,
        SERVICE_NAME,
        `User already have basket, userId: ${userId}`
      );
    }

    const newBasket: BasketUpdateDocument = {
      userId,
      products: [],
      totalPrice: 0,
      totalQuantity: 0,
    };

    await new BasketModel().save();
    return newBasket;
  } catch (err: any) {
    throw err;
  }
};

const updateByUserId = async (id: string, data: BasketUpdateData) => {
  try {
    return await applyBasketPopulation<BasketDocument>(
      BasketModel.findOneAndUpdate(
        { userId: id },
        { $set: data },
        { new: true, runValidators: true }
      )
    ).then((basket) => {
      if (!basket) {
        throw createCustomError(
          HttpStatusCode.NotFound,
          SERVICE_NAME,
          `not found. UserId: ${id}`
        );
      }
      return basketMapper.mapBasketDocumentToBasket(basket);
    });
  } catch (err: any) {
    throw err;
  }
};

const removeByUserId = async (id: string): Promise<void> => {
  try {
    const result = await BasketModel.deleteOne({ userId: id });
    if (result.deletedCount === 0) {
      throw createCustomError(
        HttpStatusCode.NotFound,
        SERVICE_NAME,
        `Not found, UserId: ${id}`
      );
    }
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
