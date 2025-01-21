import { Product, ProductUpdateData } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS } from '../config/MongoDBConfig';
import { ProductPayload } from '../controllers/products.controller';
import productMapper from '../mappers/product.mapper';
import ProductModel, { ProductDocument } from '../models/Products.model';

const SERVICE_NAME = 'Product';

const getAll = async (): Promise<Product[]> => {
  try {
    // Use populate to automatically fetch related data
    const products = await ProductModel.find()
      .populate({
        path: 'categoryId',
        model: DB_COLLECTIONS.ProductCategories,
      })
      .populate({
        path: 'pricesAndSizesIds',
        model: DB_COLLECTIONS.PricesAndSizes,
      });

    const productsData = products.map((product) =>
      productMapper.mapProductDocumentToProduct(product)
    );

    return productsData;
  } catch (err: any) {
    throw new Error(
      `Failed to fetch ${SERVICE_NAME}s.\n Error: ${err.message}`
    );
  }
};

const getById = async (id: string) => {
  try {
    const product = await ProductModel.findById(id)
      .populate({
        path: 'categoryId',
        model: DB_COLLECTIONS.ProductCategories,
      })
      .populate({
        path: 'pricesAndSizesIds',
        model: DB_COLLECTIONS.PricesAndSizes,
      });

    if (!product) {
      throw new Error(`${SERVICE_NAME} not found. Id: ${id}`);
    }

    return productMapper.mapProductDocumentToProduct(product);
  } catch (err: any) {
    throw new Error(
      `Failed to fetch product with ID ${id}:\n Error: ${err.message}`
    );
  }
};

const add = async (productData: ProductPayload): Promise<ProductDocument> => {
  try {
    const newProduct: ProductUpdateData = {
      ...productData,
      createDate: new Date().toISOString(),
      editDate: new Date().toISOString(),
    };

    const product = new ProductModel(newProduct);
    return await product.save();
  } catch (err: any) {
    throw new Error(`Failed to create product.\n Error: ${err.message}`);
  }
};

const editById = async (id: string, productData: ProductPayload) => {
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error(`Product not found. Id: ${id}`);
    }

    const updateData: ProductUpdateData = {
      ...productData,
      createDate: product.createDate,
      editDate: new Date().toISOString(),
    };

    return await ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  } catch (err: any) {
    throw new Error(`Failed to update product with ID ${id}: ${err.message}`);
  }
};

const removeById = async (id: string) => {
  try {
    const document = await ProductModel.findByIdAndDelete(id);
    if (!document) {
      throw new Error(`No document in ${SERVICE_NAME} with given id`);
    }
  } catch (err: any) {
    throw new Error(`Failed to delete product with ID ${id}: ${err.message}`);
  }
};

export default {
  getAll,
  getById,
  add,
  editById,
  removeById,
};
