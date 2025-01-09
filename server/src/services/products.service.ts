import { Product } from '../api/magnetsServer/generated';
import PriceAndSizeModel from '../models/PricesAndSizes.model';
import ProductModel, { ProductDocument } from '../models/Products.model';

/**
 * Get a list of all products.
 * @returns {Promise<Document[]>} A promise that resolves to an array of product documents.
 */
const getAllProducts = async () => {
  try {
    const products = await ProductModel.find();
    const prices = await PriceAndSizeModel.find();
    console.log(products);
    console.log(prices);
    return products;
  } catch (err: any) {
    throw new Error(`Failed to fetch products: ${err.message}`);
  }
};

/**
 * Get a product by its ID.
 * @param {string} id - The ID of the product.
 * @returns {Promise<Document | null>} A promise that resolves to the product document or null if not found.
 */
const getProductById = async (id: string): Promise<Document | null> => {
  try {
    return await ProductModel.findById(id);
  } catch (err: any) {
    throw new Error(`Failed to fetch product with ID ${id}: ${err.message}`);
  }
};

/**
 * Create a new product.
 * @param {object} productData - The data for the new product.
 * @returns {Promise<Document>} A promise that resolves to the newly created product document.
 */
const createProduct = async (
  productData: Product
): Promise<ProductDocument> => {
  try {
    const product = new ProductModel(productData);
    return await product.save();
  } catch (err: any) {
    throw new Error(`Failed to create product: ${err.message}`);
  }
};

/**
 * Update a product by its ID.
 * @param {string} id - The ID of the product to update.
 * @param {object} updateData - The data to update the product with.
 * @returns {Promise<Document | null>} A promise that resolves to the updated product document or null if not found.
 */
const updateProduct = async (
  id: string,
  updateData: Product
): Promise<Document | null> => {
  try {
    return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
  } catch (err: any) {
    throw new Error(`Failed to update product with ID ${id}: ${err.message}`);
  }
};

/**
 * Delete a product by its ID.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 */
const deleteProduct = async (id: string): Promise<void> => {
  try {
    await ProductModel.findByIdAndDelete(id);
  } catch (err: any) {
    throw new Error(`Failed to delete product with ID ${id}: ${err.message}`);
  }
};

export default {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
};
