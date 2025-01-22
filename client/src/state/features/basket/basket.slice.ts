import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketItem, Product } from '../../../api/magnetsServer/generated';
import basketUtils from './basket.utils';

interface BasketState {
  basket: BasketItem[];
  totalQuantity: number;
  totalPrice: number;
}

//TODO: Move to param db
export const QUANTITY_ARR = [1, 5, 10, 20, 30, 40, 50, 75, 100, 150, 200, 250];

const initialState: BasketState = {
  basket: [],
  totalQuantity: 0,
  totalPrice: 0,
};

//TODO: MEC-116
//Fetch by userId
// export const fetchBasket = createAsyncThunk()

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    // Add an item to the basket
    add(
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        priceAndSizeId: string;
      }>
    ) {
      console.log('add');
      const { product, quantity, priceAndSizeId } = action.payload;
      const selectedPriceAndSize = product.pricesAndSizes.find(
        (ps) => ps.id === priceAndSizeId
      );

      if (!selectedPriceAndSize) {
        throw new Error(
          `Price and size with id ${priceAndSizeId} not found for product ${product.id}`
        );
      }

      const existingProduct = state.basket.find(
        (basketItem) => basketItem.product.id === product.id
      );

      if (existingProduct) {
        const existingSize = existingProduct.priceAndSizesArray.find(
          (ps) => ps.item.id === priceAndSizeId
        );

        if (existingSize) {
          existingSize.quantity = quantity;
          existingSize.totalPrice = selectedPriceAndSize.price * quantity;
        } else {
          existingProduct.priceAndSizesArray.push({
            item: selectedPriceAndSize,
            quantity,
            totalPrice: selectedPriceAndSize.price * quantity,
          });
        }

        existingProduct.totalPrice =
          basketUtils.calculateTotalBasketItemPrice(existingProduct);
        state.totalQuantity = basketUtils.calculateTotalQuantity(state.basket);
        state.totalPrice = basketUtils.calculateTotalBasketPrice(state.basket);
      } else {
        state.basket.push({
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

      state.totalQuantity += quantity;
      state.totalPrice += selectedPriceAndSize.price * quantity;
    },
    // Change the quantity of an item in the basket
    changeQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        priceAndSizeId: string;
        operation: '+' | '-';
      }>
    ) {
      const { productId, priceAndSizeId, operation } = action.payload;
      const basketItem = state.basket.find(
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
          state.totalQuantity = basketUtils.calculateTotalQuantity(
            state.basket
          );
          state.totalPrice = basketUtils.calculateTotalBasketPrice(
            state.basket
          );
        }
      }
    },
    removeSize(
      state,
      action: PayloadAction<{
        productId: string;
        priceAndSizeId: string;
      }>
    ) {
      console.log('removeSize');
      const { productId, priceAndSizeId } = action.payload;
      const product = state.basket.find(
        (item) => item.product.id === productId
      );
      if (product) {
        const newProductSizes = product.priceAndSizesArray.filter(
          (ps) => ps.item.id !== priceAndSizeId
        );
        if (newProductSizes.length > 0) {
          product.priceAndSizesArray = newProductSizes;
        } else {
          //remove whole product from basket
          const updatedBasket = state.basket.filter(
            (item) => item.product.id !== productId
          );
          return {
            basket: updatedBasket,
            totalPrice: basketUtils.calculateTotalBasketPrice(updatedBasket),
            totalQuantity: basketUtils.calculateTotalQuantity(updatedBasket),
          };
        }
      }
    },
  },
});

export const basketSliceActions = basketSlice.actions;
export default basketSlice.reducer;
