import mongoose from 'mongoose';
import { PriceAndSizes } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS } from '../config/MongoDBConfig';

export interface PriceDocument
  extends Omit<PriceAndSizes, 'id'>,
    mongoose.Document {}

export const priceAndSizeSchema = new mongoose.Schema({
  size: String,
  price: Number,
});

const PriceAndSizeModel = mongoose.model<PriceDocument>(
  DB_COLLECTIONS.PricesAndSizes,
  priceAndSizeSchema,
  DB_COLLECTIONS.PricesAndSizes
);

export default PriceAndSizeModel;
