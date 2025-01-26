import mongoose from 'mongoose';
import { DB_COLLECTIONS, MongoDocument } from '../config/MongoDB.config';
import { ProductCategory } from '../api/magnetsServer/generated';

export interface ProductCategoryDocument
  extends MongoDocument<ProductCategory> {}

//Product categories are setted from admin controller form
//We do not know the categories, soo we can't base model on the Enum
export const productCategorySchema = new mongoose.Schema({
  categoryName: String,
  description: String,
});

const ProductCategoryModel = mongoose.model<ProductCategoryDocument>(
  DB_COLLECTIONS.ProductCategories,
  productCategorySchema,
  DB_COLLECTIONS.ProductCategories
);

export default ProductCategoryModel;
