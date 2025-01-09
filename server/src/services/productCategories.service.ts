import { ProductCategory } from '../api/magnetsServer/generated';
import ProductCategoryModel from '../models/ProductCategories.model';

const getAllProductCategories = async () => {
  try {
    const categories = await ProductCategoryModel.find();
    return categories;
  } catch (err: any) {
    console.log(err);
    throw new Error(`Failed to fetch product categories: ${err.message}`);
  }
};

const addProductCategory = async (category: Omit<ProductCategory, 'id'>) => {
  try {
    const productCategory = new ProductCategoryModel(category);
    console.log(productCategory);
    return await productCategory.save();
  } catch (err: any) {
    console.log(err);
    throw new Error(`Failed to fetch product categories: ${err.message}`);
  }
};

const editProductCategory = async (
  id: string,
  data: Omit<ProductCategory, 'id'>
) => {
  try {
    return await ProductCategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  } catch (err: any) {
    throw new Error(
      `Failed to update product category  with ID ${id}:\n ${err.message}`
    );
  }
};

/**
 * Delete a product by its ID.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 */
const deleteProductCategory = async (id: string): Promise<void> => {
  try {
    const document = await ProductCategoryModel.findById(id);
    console.log(document);
    if (!document) {
      throw new Error(`No document with given id`);
    }
    await ProductCategoryModel.findByIdAndDelete(id);
  } catch (err: any) {
    if (err)
      throw new Error(
        `Failed to delete product category with ID ${id}: ${err.message}`
      );
  }
};

export default {
  getAllProductCategories,
  addProductCategory,
  editProductCategory,
  deleteProductCategory,
};
