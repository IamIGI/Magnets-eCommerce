import mongoose from 'mongoose';
import { DB_URL } from '../constants/env';

export type MongoDocument<T> = Omit<mongoose.Document<any>, '_id'> &
  T & {
    _id: string; // Enforce _id as string
  };

export enum DB_COLLECTIONS {
  Products = 'Products',
  PricesAndSizes = 'PricesAndSizes',
  ProductCategories = 'ProductCategories',
  Baskets = 'Baskets',
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (err) {
    console.error('Could not connect to datanse\n', err);
    process.exit(1); //Shut down the server
  }
};

export default connectToDatabase;
