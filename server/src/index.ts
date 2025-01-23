import dotenv from 'dotenv';
//Load env variables -- have to be before imports, that could use this env variables
dotenv.config();

import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/MongoDBConfig';
import corsOptions from './config/corsOptions';
import { errorHandler } from './handlers/error.handler';

const PORT = process.env.PORT || 4000;

//Connect to MongoDB;
mongoose.set('strictQuery', false);
connectDB();
const app = express();
//CORS configuration
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//ApiRoutes
app.use('/products', require('./routes/api/products.route'));
app.use('/prices-sizes', require('./routes/api/pricesAndSizes.route'));
app.use('/product-categories', require('./routes/api/productCategories.route'));
app.use('/baskets', require('./routes/api/basket.route'));

app.use(errorHandler);
// handle UNKNOWN URL REQUESTS
app.all('*', (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ error: '404: not found' });
  } else if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else {
    res.type('txt').send('404: not found');
  }
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
