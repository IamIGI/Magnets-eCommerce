import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './features/products/product.slice';
import basketReducer from './features/basket/basket.slice';

const storeReducers = combineReducers({
  products: productsReducer,
  basket: basketReducer,
});

export default storeReducers;
