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
  console.log('t1');
  const response = await magnetsServerApi.productService.productsGet();
  const serializedResponse = response.map((product: Product) => ({
    ...product,
    //TODO: MEC-102 - remove serializeResponse after backend handle date management
    createDate: new Date(product.createDate).toISOString() as unknown as Date,
    editDate: new Date(product.editDate).toISOString() as unknown as Date,
  }));
  console.log(serializedResponse);
  return serializedResponse;
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
