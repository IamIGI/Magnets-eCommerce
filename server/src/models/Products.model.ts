import mongoose from 'mongoose';
import { ProductUpdateData } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS, MongoDocument } from '../config/MongoDBConfig';

export interface ProductDocument extends MongoDocument<ProductUpdateData> {}

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DB_COLLECTIONS.ProductCategories, // Odwołanie do kolekcji PricesAndSizes
    required: true,
  },
  imgName: String, //in future images will be fetched from server, right now they are saved in clients public folder
  isUserImageRequired: Boolean,
  createDate: Date,
  editDate: Date,
  isRemoved: Boolean,
  pricesAndSizesIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.PricesAndSizes, // Odwołanie do kolekcji PricesAndSizes
      required: true,
    },
  ],
});

const ProductModel = mongoose.model<ProductDocument>(
  DB_COLLECTIONS.Products,
  productSchema,
  DB_COLLECTIONS.Products
);

export default ProductModel;
