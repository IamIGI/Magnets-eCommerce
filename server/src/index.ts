import path from 'path';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/dbConnection';
import corsOptions from './config/corsOptions';

dotenv.config();

const PORT = process.env.PORT || 4000;

//Connect to MongoDB;
mongoose.set('strictQuery', false);
connectDB();
const app = express();
//CORS configuration
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//ApiRoutes
app.use('/todolist', require('./routes/api/todoList'));

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
