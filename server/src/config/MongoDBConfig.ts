import mongoose from 'mongoose';

export type MongoDocument<T> = Omit<mongoose.Document<any>, '_id'> &
  T & {
    _id: string; // Enforce _id as string
  };

const DB_URL =
  process.env.PROD === 'true'
    ? process.env.DATABASE_URI_PROD
    : process.env.DATABASE_URI_DEV;

export enum DB_COLLECTIONS {
  Products = 'Products',
  PricesAndSizes = 'PricesAndSizes',
  ProductCategories = 'ProductCategories',
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL!);
  } catch (err) {
    console.error('DB no connection');
    console.error(err);
  }
};

export default connectDB;
