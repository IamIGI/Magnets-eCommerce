import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../api/magnetsServer/generated';
import magnetsServerApi from '../../../api/magnetsServer/magnetsServer.api.config';
import { FetchStatus } from '../../../interfaces/global';

interface ProductsState {
  products: Product[];
  status: FetchStatus;
  counter: number;
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  products: [],
  status: FetchStatus.Idle,
  counter: 0,
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk('products/get', async () => {
  return await magnetsServerApi.productService.productsGet();
});

export const fetchProductById = createAsyncThunk(
  'products/getById',
  async (id: string) => {
    return await magnetsServerApi.productService.productsIdGet(id);
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      return {
        ...state,
        selectedProduct: state.products.find((p) => p.id === id) || null,
      };
    },
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
        state.status = FetchStatus.Loading;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.status = FetchStatus.Idle;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.status = FetchStatus.Failed;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = FetchStatus.Loading;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.selectedProduct = action.payload; // Update the selected product
          state.status = FetchStatus.Idle;
        }
      )
      .addCase(fetchProductById.rejected, (state) => {
        state.status = FetchStatus.Failed;
      });
  },
});

export const productSliceActions = productsSlice.actions;
export default productsSlice.reducer;
