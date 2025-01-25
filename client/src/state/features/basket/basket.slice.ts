import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import basketUtils from './basket.utils';
import magnetsServerApi from '../../../api/magnetsServer/magnetsServer.api.config';
import { parameters } from '../../../config/parameters';
import { FetchStatus } from '../../../interfaces/global';
import {
  AddToBasket,
  BasketData,
  BasketState,
  ChangeBasketItemQuantity,
  RemoveBasketItemSize,
} from './basket.interfaces';
import { AppState } from '../../store';

const TEMP_USERID = undefined;

//TODO: Move to param db
export const QUANTITY_ARR = [1, 5, 10, 20, 30, 40, 50, 75, 100, 150, 200, 250];

const initialState: BasketState = {
  data: {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  fetchStatus: FetchStatus.Idle,
};

export const getBasket = createAsyncThunk(
  'basket/get',
  async (): Promise<BasketData> => {
    // TODO: in future we will save user data in other store and extract user id from it.
    if (TEMP_USERID) {
      let basket = await magnetsServerApi.basketService.getBasket(TEMP_USERID);

      if (!basket) {
        basket = await magnetsServerApi.basketService.createBasket({
          userId: TEMP_USERID,
        });
      }

      localStorage.removeItem(parameters.localStorages.basket);

      return {
        products: basket.products,
        totalPrice: basket.totalPrice,
        totalQuantity: basket.totalQuantity,
      };
    } else {
      const localBasket = localStorage.getItem(parameters.localStorages.basket);
      if (!localBasket) {
        localStorage.setItem(
          parameters.localStorages.basket,
          JSON.stringify(initialState.data)
        );
        return initialState.data;
      }

      return JSON.parse(localBasket) as BasketData;
    }
  }
);

export const addToBasket = createAsyncThunk(
  'basket/add',
  async (data: AddToBasket, thunkAPI): Promise<BasketData> => {
    const { priceAndSizeId, product, quantity } = data;
    const basket = structuredClone(
      (thunkAPI.getState() as AppState).basket.data
    );

    // Find the selected price and size
    const selectedPriceAndSize = product.pricesAndSizes.find(
      (ps) => ps.id === priceAndSizeId
    );
    if (!selectedPriceAndSize) {
      throw new Error(
        `Price and size with id ${priceAndSizeId} not found for product ${product.id}`
      );
    }

    // Find existing product and size in the basket
    const existingProduct = basket.products.find(
      (item) => item.product.id === product.id
    );
    const existingSize = existingProduct?.priceAndSizesArray.find(
      (ps) => ps.item.id === priceAndSizeId
    );

    if (existingProduct && existingSize) {
      // Update existing size
      existingSize.quantity = quantity;
      existingSize.totalPrice = selectedPriceAndSize.price * quantity;
    } else if (existingProduct) {
      // Add new size to existing product
      existingProduct.priceAndSizesArray.push({
        item: selectedPriceAndSize,
        quantity,
        totalPrice: selectedPriceAndSize.price * quantity,
      });
    } else {
      // Add new product with size
      basket.products.push({
        product,
        priceAndSizesArray: [
          {
            item: selectedPriceAndSize,
            quantity,
            totalPrice: selectedPriceAndSize.price * quantity,
          },
        ],
        totalPrice: selectedPriceAndSize.price * quantity,
      });
    }

    // Update totals
    basket.totalQuantity = basketUtils.calculateTotalQuantity(basket.products);
    basket.totalPrice = basketUtils.calculateTotalBasketPrice(basket.products);

    await basketUtils.updateBasket(TEMP_USERID, basket);

    return basket;
  }
);

export const changeBasketItemQuantity = createAsyncThunk(
  'basket/changeQuantity',
  async (
    data: ChangeBasketItemQuantity,
    thunkAPI
  ): Promise<BasketData | undefined> => {
    const { productId, priceAndSizeId, operation } = data;
    const state = thunkAPI.getState() as AppState;
    const basket = structuredClone(state.basket.data);

    const basketItem = basket.products.find(
      (item) => item.product.id === productId
    );
    if (!basketItem) return;

    // Find the price for the given size
    const priceForSize = basketItem.product.pricesAndSizes.find(
      (ps) => ps.id === priceAndSizeId
    )?.price;
    if (!priceForSize) {
      throw new Error(`Price not found for priceAndSizeId ${priceAndSizeId}`);
    }

    // Find the priceAndSize item
    const priceAndSizeItem = basketItem.priceAndSizesArray.find(
      (ps) => ps.item.id === priceAndSizeId
    );
    if (!priceAndSizeItem) return;

    // Calculate new quantity
    const newQuantity = basketUtils.getNewItemQuantity(
      QUANTITY_ARR,
      priceAndSizeItem.quantity,
      operation
    );
    if (newQuantity === priceAndSizeItem.quantity) return;

    // Update quantities and prices
    priceAndSizeItem.quantity = newQuantity;
    priceAndSizeItem.totalPrice = newQuantity * priceForSize;
    basketItem.totalPrice =
      basketUtils.calculateTotalBasketItemPrice(basketItem);
    basket.totalQuantity = basketUtils.calculateTotalQuantity(basket.products);
    basket.totalPrice = basketUtils.calculateTotalBasketPrice(basket.products);

    // Update the basket
    await basketUtils.updateBasket(TEMP_USERID, basket);

    return basket;
  }
);

export const removeBasketItemSize = createAsyncThunk(
  'basket/removeSize',
  async (
    data: RemoveBasketItemSize,
    thunkAPI
  ): Promise<BasketData | undefined> => {
    const { productId, priceAndSizeId } = data;
    let basket = structuredClone((thunkAPI.getState() as AppState).basket.data);
    const product = basket.products.find(
      (item) => item.product.id === productId
    );
    if (product) {
      const newProductSizes = product.priceAndSizesArray.filter(
        (ps) => ps.item.id !== priceAndSizeId
      );
      if (newProductSizes.length > 0) {
        product.priceAndSizesArray = newProductSizes;
      } else {
        //remove whole product from products
        const updatedBasketItems = basket.products.filter(
          (item) => item.product.id !== productId
        );

        basket = {
          products: updatedBasketItems,
          totalPrice: basketUtils.calculateTotalBasketPrice(updatedBasketItems),
          totalQuantity: basketUtils.calculateTotalQuantity(updatedBasketItems),
        };
      }

      await basketUtils.updateBasket(TEMP_USERID, basket);

      return basket;
    }
  }
);

const basketSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBasket.pending, (state) => {
        state.fetchStatus = FetchStatus.Loading;
      })
      .addCase(
        getBasket.fulfilled,
        (state, action: PayloadAction<BasketData>) => {
          state.data = action.payload;
          state.fetchStatus = FetchStatus.Idle;
        }
      )
      .addCase(getBasket.rejected, (state) => {
        state.fetchStatus = FetchStatus.Failed;
      })
      .addCase(addToBasket.pending, (state) => {
        state.fetchStatus = FetchStatus.Loading;
      })
      .addCase(
        addToBasket.fulfilled,
        (state, action: PayloadAction<BasketData>) => {
          state.data = action.payload;
          state.fetchStatus = FetchStatus.Idle;
        }
      )
      .addCase(addToBasket.rejected, (state) => {
        state.fetchStatus = FetchStatus.Failed;
      })
      .addCase(changeBasketItemQuantity.pending, (state) => {
        state.fetchStatus = FetchStatus.Loading;
      })
      .addCase(
        changeBasketItemQuantity.fulfilled,
        (state, action: PayloadAction<BasketData | undefined>) => {
          if (action.payload) {
            state.data = action.payload;
          }
          state.fetchStatus = FetchStatus.Idle;
        }
      )
      .addCase(changeBasketItemQuantity.rejected, (state) => {
        state.fetchStatus = FetchStatus.Failed;
      })
      .addCase(removeBasketItemSize.pending, (state) => {
        state.fetchStatus = FetchStatus.Loading;
      })
      .addCase(
        removeBasketItemSize.fulfilled,
        (state, action: PayloadAction<BasketData | undefined>) => {
          if (action.payload) {
            state.data = action.payload;
          }
          state.fetchStatus = FetchStatus.Idle;
        }
      )
      .addCase(removeBasketItemSize.rejected, (state) => {
        state.fetchStatus = FetchStatus.Failed;
      });
  },
});

export const basketSliceActions = basketSlice.actions;
export default basketSlice.reducer;
