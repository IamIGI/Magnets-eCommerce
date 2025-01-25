import mongoose from 'mongoose';
import { BasketUpdateData } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS, MongoDocument } from '../config/MongoDBConfig';

export interface BasketUpdateDocument extends BasketUpdateData {
  userId: string;
}

export interface BasketDocument extends MongoDocument<BasketUpdateDocument> {}

const basketSchema = new mongoose.Schema({
  userId: String, //TODO: in future, update for userId mongo object
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DB_COLLECTIONS.Products,
        required: true,
      },
      priceAndSizesArray: [
        {
          itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: DB_COLLECTIONS.PricesAndSizes,
            required: true,
          },
          quantity: Number,
          totalPrice: Number,
        },
      ],
      totalPrice: Number,
    },
  ],
  totalQuantity: Number,
  totalPrice: Number,
});

const BasketModel = mongoose.model<BasketDocument>(
  DB_COLLECTIONS.Baskets,
  basketSchema,
  DB_COLLECTIONS.Baskets
);

export default BasketModel;
