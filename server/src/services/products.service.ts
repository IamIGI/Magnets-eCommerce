import { Product, ProductUpdateData } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS } from '../config/MongoDBConfig';
import { ProductPayload } from '../controllers/products.controller';
import { createCustomError } from '../handlers/error.handler';
import productMapper from '../mappers/product.mapper';
import ProductModel, { ProductDocument } from '../models/Products.model';
import { HttpStatusCode } from '../types/error.type';

const SERVICE_NAME = 'Products';

async function applyProductPopulation<T>(query: any): Promise<T> {
  return query
    .populate({
      path: 'categoryId',
      model: DB_COLLECTIONS.ProductCategories,
    })
    .populate({
      path: 'pricesAndSizesIds',
      model: DB_COLLECTIONS.PricesAndSizes,
    });
}

const getAll = async (): Promise<Product[]> => {
  try {
    // Use populate to automatically fetch related data
    const products = await applyProductPopulation<ProductDocument[]>(
      ProductModel.find()
    );

    const productsData = products.map((product) =>
      productMapper.mapProductDocumentToProduct(product)
    );

    return productsData;
  } catch (err: any) {
    throw createCustomError(
      HttpStatusCode.InternalServerError,
      SERVICE_NAME,
      JSON.stringify(err)
    );
  }
};

const getById = async (id: string) => {
  try {
    const product = await applyProductPopulation<ProductDocument>(
      ProductModel.findById(id)
    );

    if (!product) {
      throw createCustomError(
        HttpStatusCode.NotFound,
        SERVICE_NAME,
        `Not found. UserId: ${id}`
      );
    }

    return productMapper.mapProductDocumentToProduct(product);
  } catch (err: any) {
    throw err;
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
    throw createCustomError(
      HttpStatusCode.InternalServerError,
      SERVICE_NAME,
      JSON.stringify(err)
    );
  }
};

const editById = async (id: string, productData: ProductPayload) => {
  try {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw createCustomError(
        HttpStatusCode.NotFound,
        SERVICE_NAME,
        `Not found. UserId: ${id}`
      );
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
    throw err;
  }
};

const removeById = async (id: string) => {
  try {
    return await ProductModel.findByIdAndDelete(id).then((data) => {
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
  getById,
  add,
  editById,
  removeById,
};
