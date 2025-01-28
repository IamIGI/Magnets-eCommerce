import { Product, ProductUpdateData } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS } from '../config/MongoDB.config';
import { ProductPayload } from '../controllers/products.controller';
import productMapper from '../mappers/product.mapper';
import ProductModel, { ProductDocument } from '../models/Products.model';
import { HttpStatusCode } from '../constants/error.constants';
import appAssert from '../utils/appErrorAssert.utils';

const SERVICE_NAME = DB_COLLECTIONS.Products;

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
  const products = await applyProductPopulation<ProductDocument[]>(
    ProductModel.find()
  );

  const productsData = products.map((product) =>
    productMapper.mapProductDocumentToProduct(product)
  );

  return productsData;
};

const getById = async (id: string) => {
  const product = await applyProductPopulation<ProductDocument>(
    ProductModel.findById(id)
  );

  appAssert(
    product,
    HttpStatusCode.NotFound,
    `Not found. UserId: ${id}`,
    SERVICE_NAME
  );

  return productMapper.mapProductDocumentToProduct(product);
};

const add = async (productData: ProductPayload): Promise<ProductDocument> => {
  const newProduct: ProductUpdateData = {
    ...productData,
    createDate: new Date().toISOString(),
    editDate: new Date().toISOString(),
  };

  const product = new ProductModel(newProduct);

  return await product.save();
};

const editById = async (id: string, productData: ProductPayload) => {
  const product = await ProductModel.findById(id);

  appAssert(
    product,
    HttpStatusCode.NotFound,
    `Not found. UserId: ${id}`,
    SERVICE_NAME
  );

  const updateData: ProductUpdateData = {
    ...productData,
    createDate: product.createDate,
    editDate: new Date().toISOString(),
  };

  return await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const removeById = async (id: string) => {
  const removedProduct = await ProductModel.findByIdAndDelete(id);
  appAssert(
    removedProduct,
    HttpStatusCode.NotFound,
    `Not found. id: ${id}`,
    SERVICE_NAME
  );

  return removedProduct;
};

export default {
  getAll,
  getById,
  add,
  editById,
  removeById,
};
