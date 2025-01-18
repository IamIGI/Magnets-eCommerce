import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import basketReducer from './features/basket/basketSlice';

const storeReducers = combineReducers({
  products: productsReducer,
  basket: basketReducer,
});

export default storeReducers;
