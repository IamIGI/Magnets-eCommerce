import { PriceAndSizes } from '../api/magnetsServer/generated';
import PriceAndSizeModel from '../models/PricesAndSizes.model';

const SERVICE_NAME = 'PricesAndSizes';

const getAll = async () => {
  try {
    const dataArray = await PriceAndSizeModel.find();
    return dataArray;
  } catch (err: any) {
    console.log(err);
    throw new Error(`Failed to fetch ${SERVICE_NAME}: ${err.message}`);
  }
};

const add = async (payload: Omit<PriceAndSizes, 'id'>) => {
  try {
    console.log(payload);
    const PriceAndSizes = new PriceAndSizeModel(payload);
    console.log(PriceAndSizes);
    return await PriceAndSizes.save();
  } catch (err: any) {
    console.log(err);
    throw new Error(`Failed to fetch ${SERVICE_NAME}: ${err.message}`);
  }
};

const editById = async (id: string, payload: Omit<PriceAndSizes, 'id'>) => {
  try {
    return await PriceAndSizeModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  } catch (err: any) {
    throw new Error(
      `Failed to update ${SERVICE_NAME}  with ID ${id}:\n ${err.message}`
    );
  }
};

/**
 * Delete a product by its ID.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 */
const removeById = async (id: string): Promise<void> => {
  try {
    const document = await PriceAndSizeModel.findById(id);

    if (!document) {
      throw new Error(`No document in ${SERVICE_NAME} with given id`);
    }
    await PriceAndSizeModel.findByIdAndDelete(id);
  } catch (err: any) {
    if (err)
      throw new Error(
        `Failed to delete ${SERVICE_NAME} with ID ${id}: ${err.message}`
      );
  }
};

export default {
  getAll,
  add,
  editById,
  removeById,
};
