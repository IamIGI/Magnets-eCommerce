import mongoose from 'mongoose';
import { Product, ProductCategory } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS } from '../config/MongoDBConfig';

export interface ProductDocument
  extends Omit<Product, 'id'>,
    mongoose.Document {}
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DB_COLLECTIONS.ProductCategories, // Odwołanie do kolekcji PricesAndSizes
    required: true,
  },
  imgName: String, //in future images will be fetched from server, right now they are saved in clients public folder
  isImageUpload: Boolean,
  createDate: Date,
  editDate: Date,
  isRemoved: Boolean,
  pricesAndSizes: [
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
