import mongoose from 'mongoose';
import { PriceAndSizes } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS, MongoDocument } from '../config/MongoDBConfig';

export interface PriceAndSizesDocument extends MongoDocument<PriceAndSizes> {}

export const priceAndSizeSchema = new mongoose.Schema({
  size: String,
  price: Number,
});

const PriceAndSizeModel = mongoose.model<PriceAndSizesDocument>(
  DB_COLLECTIONS.PricesAndSizes,
  priceAndSizeSchema,
  DB_COLLECTIONS.PricesAndSizes
);

export default PriceAndSizeModel;
