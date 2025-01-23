import { BasketUpdateData } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS } from '../config/MongoDBConfig';
import { createCustomError } from '../handlers/error.handler';
import basketMapper from '../mappers/basket.mapper';
import BasketModel from '../models/Basket.model';
import { HttpStatusCode } from '../types/error.type';

const SERVICE_NAME = 'Baskets';

const getByUserId = async (id: string) => {
  try {
    const data = await BasketModel.findOne({ userId: id })
      .populate({
        path: 'products.productId',
        model: DB_COLLECTIONS.Products,
      })
      .populate({
        path: 'products.priceAndSizesArray.itemId',
        model: DB_COLLECTIONS.PricesAndSizes,
      })
      .then((basket) => {
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

const create = async (data: BasketUpdateData) => {
  try {
    const isDataExists = await BasketModel.findOne({ userId: data.userId });
    if (isDataExists) {
      throw createCustomError(
        HttpStatusCode.NotFound,
        SERVICE_NAME,
        `User already have basket, userId: ${data.userId}`
      );
    }

    const newData = new BasketModel(data);
    console.log(newData);
    await newData.save();
    return getByUserId(data.userId!);
  } catch (err: any) {
    throw err;
  }
};

const updateByUserId = async (id: string, data: BasketUpdateData) => {
  try {
    return await BasketModel.findOneAndUpdate(
      { userId: id },
      { $set: data },
      { new: true, runValidators: true }
    )
      .populate({
        path: 'products.productId',
        model: DB_COLLECTIONS.Products,
      })
      .populate({
        path: 'products.priceAndSizesArray.itemId',
        model: DB_COLLECTIONS.PricesAndSizes,
      })
      .then((basket) => {
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
