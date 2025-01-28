import mongoose from 'mongoose';
import envConstants from '../constants/env.constants';

export type MongoDocument<T> = Omit<mongoose.Document<any>, '_id'> &
  T & {
    _id: string; // Enforce _id as string
  };

export const enum DB_COLLECTIONS {
  Products = 'Products',
  PricesAndSizes = 'PricesAndSizes',
  ProductCategories = 'ProductCategories',
  Baskets = 'Baskets',
  Users = 'Users',
  VerificationCodes = 'VerificationCodes',
  Sessions = 'Sessions',
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(envConstants.DB_URL);
  } catch (err) {
    console.error('Could not connect to database\n', err);
    process.exit(1); //Shut down the server
  }
};

export default connectToDatabase;
