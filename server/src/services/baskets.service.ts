import { BasketUpdateData } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS } from '../config/MongoDBConfig';
import BasketModel from '../models/Basket.model';

const SERVICE_NAME = 'Basket';

const getByUserId = async (id: string) => {
  try {
    const data = await BasketModel.findOne({ userId: id })
      .populate({
        path: 'basket.productId',
        model: DB_COLLECTIONS.Products,
      })
      .populate({
        path: 'basket.priceAndSizesArray.itemId',
        model: DB_COLLECTIONS.PricesAndSizes,
      });

    if (!data) {
      throw new Error(`${SERVICE_NAME} not found. UserId: ${id}`);
    }

    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(`Failed to fetch product categories: ${err.message}`);
  }
};

const add = async (data: BasketUpdateData) => {
  try {
    const newData = new BasketModel(data);
    console.log(newData);
    await newData.save();
    return getByUserId(data.userId!);
  } catch (err: any) {
    console.log(err);
    throw new Error(`Failed to fetch product categories: ${err.message}`);
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
        path: 'basket.productId',
        model: DB_COLLECTIONS.Products,
      })
      .populate({
        path: 'basket.priceAndSizesArray.itemId',
        model: DB_COLLECTIONS.PricesAndSizes,
      });
  } catch (err: any) {
    throw new Error(
      `Failed to update product category  with ID ${id}:\n ${err.message}`
    );
  }
};

const removeByUserId = async (id: string): Promise<void> => {
  try {
    const result = await BasketModel.deleteOne({ userId: id });
    if (result.deletedCount === 0) {
      throw new Error('Basket not found');
    }
  } catch (err: any) {
    if (err)
      throw new Error(
        `Failed to delete product category with ID ${id}: ${err.message}`
      );
  }
};

export default {
  getByUserId,
  add,
  updateByUserId,
  removeByUserId,
};
