import { ProductCategoryPayload } from '../controllers/productCategories.controller';
import ProductCategoryModel from '../models/ProductCategories.model';
import { HttpStatusCode } from '../constants/error.constants';
import { DB_COLLECTIONS } from '../config/MongoDB.config';
import appAssert from '../utils/appErrorAssert.utils';

const SERVICE_NAME = DB_COLLECTIONS.ProductCategories;

const getAll = async () => {
  const categories = await ProductCategoryModel.find();
  return categories;
};

const add = async (category: ProductCategoryPayload) => {
  const productCategory = new ProductCategoryModel(category);
  return await productCategory.save();
};

const editById = async (id: string, data: ProductCategoryPayload) => {
  const updatedProduct = await ProductCategoryModel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );

  appAssert(
    updatedProduct,
    HttpStatusCode.NotFound,
    `Not found, id: ${id}`,
    SERVICE_NAME
  );

  return updatedProduct;
};

const removeById = async (id: string) => {
  const removedItem = ProductCategoryModel.findByIdAndDelete(id);
  appAssert(
    removedItem,
    HttpStatusCode.NotFound,
    `Not found, id: ${id}`,
    SERVICE_NAME
  );

  return removedItem;
};

export default {
  getAll,
  add,
  editById,
  removeById,
};
