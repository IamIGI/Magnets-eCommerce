import dotenv from 'dotenv';
//Load env variables -- have to be before imports, that could use this env variables
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/MongoDBConfig';
import corsOptions from './config/corsOptions';
import { errorHandler, unknownURLHandler } from './middelware/error.handler';
import cookieParser from 'cookie-parser';
import catchErrors from './utils/catchErrors';
import { HttpStatusCode } from './types/error.type';
import authRoutes from './routes/auth.route';
import productRoutes from './routes/api/products.route';
import basketRoutes from './routes/api/basket.route';
import priceAndSizesRoutes from './routes/api/pricesAndSizes.route';
import productCategoriesRoutes from './routes/api/productCategories.route';

const PORT = process.env.PORT || 4000;

//Connect to MongoDB;
mongoose.set('strictQuery', false);
connectDB();
const app = express();

app.use(express.json()); //allows to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); //parse FORM data
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//ApiRoutes
app.get('/', (req, res, next) => {
  res.status(HttpStatusCode.OK).json({ status: 'Healthy' });
});
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/prices-sizes', priceAndSizesRoutes);
app.use('/product-categories', productCategoriesRoutes);
app.use('/basket', basketRoutes);

app.use(errorHandler);
app.all('*', unknownURLHandler);

mongoose.connection.once('open', () => {
  console.log('Successfully connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
