import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketItemUpdateData } from '../../../api/magnetsServer/generated';
import basketUtils from './basket.utils';
import magnetsServerApi from '../../../api/magnetsServer/magnetsServer.api.config';
import { parameters } from '../../../config/parameters';
import { FetchStatus } from '../../../interfaces/global';
import { AddToBasket, BasketData, BasketState } from './basket.interfaces';
import { AppState } from '../../store';

const TEMP_USERID = '678a180dcb9fe85068c49122';

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

      localStorage.removeItem(parameters.localStorages.basket);
      if (!basket) {
        basket = await magnetsServerApi.basketService.createBasket({
          userId: TEMP_USERID,
        });
      }

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
  async (data: AddToBasket, thunkAPI) => {
    try {
      const { priceAndSizeId, product, quantity } = data;
      const basket = structuredClone(
        (thunkAPI.getState() as AppState).basket.data
      );

      // Extract the selected price and size
      const selectedPriceAndSize = product.pricesAndSizes.find(
        (ps) => ps.id === priceAndSizeId
      );
      if (!selectedPriceAndSize) {
        throw new Error(
          `Price and size with id ${priceAndSizeId} not found for product ${product.id}`
        );
      }

      // Check if the product already exists in the basket
      const existingProductIndex = basket.products.findIndex(
        (basketItem) => basketItem.product.id === product.id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = basket.products[existingProductIndex];
        const existingSizeIndex = existingProduct.priceAndSizesArray.findIndex(
          (ps) => ps.item.id === priceAndSizeId
        );

        if (existingSizeIndex !== -1) {
          // Update the quantity and total price for the existing size in product
          existingProduct.priceAndSizesArray[existingSizeIndex].quantity =
            quantity;
          existingProduct.priceAndSizesArray[existingSizeIndex].totalPrice =
            selectedPriceAndSize.price * quantity;
        } else {
          // Add the new size to the product
          existingProduct.priceAndSizesArray.push({
            item: selectedPriceAndSize,
            quantity,
            totalPrice: selectedPriceAndSize.price * quantity,
          });
        }

        // Update the total price for the product
        basket.products[existingProductIndex] = existingProduct;
        basket.products[existingProductIndex].totalPrice =
          basketUtils.calculateTotalBasketItemPrice(existingProduct);
        basket.totalQuantity = basketUtils.calculateTotalQuantity(
          basket.products
        );
        basket.totalPrice = basketUtils.calculateTotalBasketPrice(
          basket.products
        );
      } else {
        // Add the new product with its size and quantity
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

      // Update the basket totals
      basket.totalQuantity = basketUtils.calculateTotalQuantity(
        basket.products
      );
      basket.totalPrice = basketUtils.calculateTotalBasketPrice(
        basket.products
      );

      if (TEMP_USERID) {
        const updatedProductsPayload = basket.products.map(
          (product) =>
            ({
              productId: product.product.id,
              priceAndSizesArray: product.priceAndSizesArray.map((ps) => ({
                itemId: ps.item.id,
                quantity: ps.quantity,
                totalPrice: ps.totalPrice,
              })),
              totalPrice: product.totalPrice,
            } as BasketItemUpdateData)
        );
        const payload = {
          products: updatedProductsPayload,
          totalPrice: basket.totalPrice,
          totalQuantity: basket.totalQuantity,
        };

        await magnetsServerApi.basketService.updateBasket(payload, TEMP_USERID);
      } else {
        localStorage.setItem(
          parameters.localStorages.basket,
          JSON.stringify(basket)
        );
      }

      return basket;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Failed to add item to basket:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to add item to basket'
      );
    }
  }
);

//TODO: MEC-116
//Fetch by userId
// export const fetchBasket = createAsyncThunk()

const basketSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Change the quantity of an item in the products
    changeQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        priceAndSizeId: string;
        operation: '+' | '-';
      }>
    ) {
      const { productId, priceAndSizeId, operation } = action.payload;
      const basketItem = state.data.products.find(
        (item) => item.product.id === productId
      );

      if (basketItem) {
        const priceForSize = basketItem.product.pricesAndSizes.find(
          (ps) => ps.id === priceAndSizeId
        )?.price;
        if (priceForSize === undefined) {
          throw new Error(
            `Price not found for priceAndSizeId ${priceAndSizeId}`
          );
        }

        const priceAndSizeItem = basketItem.priceAndSizesArray.find(
          (ps) => ps.item.id === priceAndSizeId
        );

        if (priceAndSizeItem) {
          const newQuantity = basketUtils.getNewItemQuantity(
            QUANTITY_ARR,
            priceAndSizeItem.quantity,
            operation
          );

          priceAndSizeItem.quantity = newQuantity;
          priceAndSizeItem.totalPrice = newQuantity * priceForSize;
          basketItem.totalPrice =
            basketUtils.calculateTotalBasketItemPrice(basketItem);
          state.data.totalQuantity = basketUtils.calculateTotalQuantity(
            state.data.products
          );
          state.data.totalPrice = basketUtils.calculateTotalBasketPrice(
            state.data.products
          );
        }
      }
    },
    // Remove size and product if last size is removed
    removeSize(
      state,
      action: PayloadAction<{
        productId: string;
        priceAndSizeId: string;
      }>
    ) {
      console.log('removeSize');
      const { productId, priceAndSizeId } = action.payload;
      const product = state.data.products.find(
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
          const updatedBasket = state.data.products.filter(
            (item) => item.product.id !== productId
          );
          return {
            fetchStatus: FetchStatus.Idle,
            data: {
              products: updatedBasket,
              totalPrice: basketUtils.calculateTotalBasketPrice(updatedBasket),
              totalQuantity: basketUtils.calculateTotalQuantity(updatedBasket),
            },
          };
        }
      }
    },
  },
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
      });
  },
});

export const basketSliceActions = basketSlice.actions;
export default basketSlice.reducer;
