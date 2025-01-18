import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../api/magnetsServer/generated';
import magnetsServerApi from '../../../api/magnetsServer/magnetsServer.api.config';
import { FetchStatus } from '../../../interfaces/global';
import { AppState } from '../../store';

interface ProductsState {
  products: Product[];
  status: FetchStatus;
  counter: number;
  selectedProduct: Product | null;
  productsLastFetched: number | null;
}

const initialState: ProductsState = {
  products: [],
  status: FetchStatus.Idle,
  counter: 0,
  selectedProduct: null,
  productsLastFetched: null,
};

export const fetchProducts = createAsyncThunk(
  'products/get',
  async (_, { getState }) => {
    const { productsLastFetched, products } = (getState() as AppState).products;

    const timePeriod = 5 * 10 * 1000; // 5min
    const now = Date.now();

    // If the data is still fresh, return the existing products
    const timeDiff = productsLastFetched ? now - productsLastFetched : null;
    if (timeDiff !== null && timeDiff < timePeriod && products.length > 0) {
      return { fetched: false }; // Return products from the store
    }

    const fetchedProducts = await magnetsServerApi.productService.productsGet();
    return { fetched: true, products: fetchedProducts };
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = FetchStatus.Loading;
      })
      .addCase(
        fetchProducts.fulfilled,
        (
          state,
          action: PayloadAction<{ fetched: boolean; products?: Product[] }>
        ) => {
          const { fetched, products } = action.payload;

          state.status = FetchStatus.Idle;
          if (fetched && products) {
            state.productsLastFetched = Date.now();
            state.products = products;
          }
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
