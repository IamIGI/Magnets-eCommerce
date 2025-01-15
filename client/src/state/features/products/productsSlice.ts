import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../api/magnetsServer/generated';
import magnetsServerApi from '../../../api/magnetsServer/magnetsServer.api.config';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'failed';
  counter: number;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  counter: 0,
};

export const fetchProducts = createAsyncThunk('products/get', async () => {
  return await magnetsServerApi.productService.productsGet();
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    inc: (state) => {
      return {
        ...state,
        counter: state.counter + 1,
      };
    },
    dec: (state) => {
      return {
        ...state,
        counter: state.counter - 1,
      };
    },
    incByAmount: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        counter: state.counter + action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.items = action.payload;
          state.status = 'idle';
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const productSliceActions = productsSlice.actions;
export default productsSlice.reducer;
