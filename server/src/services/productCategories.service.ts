import { ProductCategoryPayload } from '../controllers/productCategories.controller';
import { createCustomError } from '../middelware/error.handler';
import ProductCategoryModel from '../models/ProductCategories.model';
import { HttpStatusCode } from '../types/error.type';

const SERVICE_NAME = 'Product Categories';

const getAll = async () => {
  try {
    const categories = await ProductCategoryModel.find();
    return categories;
  } catch (err: any) {
    throw createCustomError(
      HttpStatusCode.InternalServerError,
      SERVICE_NAME,
      JSON.stringify(err)
    );
  }
};

const add = async (category: ProductCategoryPayload) => {
  try {
    const productCategory = new ProductCategoryModel(category);

    return await productCategory.save();
  } catch (err: any) {
    throw createCustomError(
      HttpStatusCode.InternalServerError,
      SERVICE_NAME,
      JSON.stringify(err)
    );
  }
};

const editById = async (id: string, data: ProductCategoryPayload) => {
  try {
    return await ProductCategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    }).then((data) => {
      if (!data) {
        throw createCustomError(
          HttpStatusCode.NotFound,
          SERVICE_NAME,
          `Not found, id: ${id}`
        );
      }
      return data;
    });
  } catch (err: any) {
    throw err;
  }
};

/**
 * Delete a product by its ID.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 */
const removeById = async (id: string): Promise<void> => {
  try {
    await ProductCategoryModel.findByIdAndDelete(id).then((data) => {
      if (!data) {
        throw createCustomError(
          HttpStatusCode.NotFound,
          SERVICE_NAME,
          `Not found, id: ${id}`
        );
      }
      return data;
    });
  } catch (err: any) {
    throw err;
  }
};

export default {
  getAll,
  add,
  editById,
  removeById,
};
