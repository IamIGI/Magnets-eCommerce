import mongoose from 'mongoose';
import { BasketUpdateData } from '../api/magnetsServer/generated';
import { DB_COLLECTIONS, MongoDocument } from '../config/MongoDB.config';

export interface BasketUpdateDocument extends BasketUpdateData {
  userId: string;
}

export interface BasketDocument extends MongoDocument<BasketUpdateDocument> {}

const basketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DB_COLLECTIONS.Users,
    required: true,
    index: true, //use it as index, cuz we will search by userId
  },
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
