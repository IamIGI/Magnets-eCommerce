import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketItem, Product } from '../../../api/magnetsServer/generated';
import basketUtils from './basket.utils';

interface BasketState {
  basket: BasketItem[];
  totalQuantity: number;
  totalPrice: number;
}

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
          (ps) => ps.priceAndSizeItem.id === priceAndSizeId
        );

        if (existingSize) {
          existingSize.quantity += quantity;
          existingSize.totalPrice += selectedPriceAndSize.price * quantity;
        } else {
          existingProduct.priceAndSizesArray.push({
            priceAndSizeItem: selectedPriceAndSize,
            quantity,
            totalPrice: selectedPriceAndSize.price * quantity,
          });
        }

        existingProduct.totalPrice += selectedPriceAndSize.price * quantity;
      } else {
        state.basket.push({
          product,
          priceAndSizesArray: [
            {
              priceAndSizeItem: selectedPriceAndSize,
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
    // Remove an item from the basket
    remove(
      state,
      action: PayloadAction<{ productId: string; priceAndSizeId: string }>
    ) {
      const { productId, priceAndSizeId } = action.payload;
      const productIndex = state.basket.findIndex(
        (item) => item.product.id === productId
      );

      if (productIndex !== -1) {
        const product = state.basket[productIndex];
        const sizeIndex = product.priceAndSizesArray.findIndex(
          (ps) => ps.priceAndSizeItem.id === priceAndSizeId
        );

        if (sizeIndex !== -1) {
          const size = product.priceAndSizesArray[sizeIndex];
          state.totalQuantity -= size.quantity;
          state.totalPrice -= size.totalPrice;

          product.priceAndSizesArray.splice(sizeIndex, 1);

          if (product.priceAndSizesArray.length === 0) {
            state.basket.splice(productIndex, 1);
          } else {
            product.totalPrice -= size.totalPrice;
          }
        }
      }
    },
    // Change the quantity of an item in the basket
    changeQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        priceAndSizeId: string;
        quantity: number;
      }>
    ) {
      const { productId, priceAndSizeId, quantity } = action.payload;
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
          (ps) => ps.priceAndSizeItem.id === priceAndSizeId
        );

        if (priceAndSizeItem) {
          priceAndSizeItem.quantity = quantity;
          priceAndSizeItem.totalPrice = quantity * priceForSize;

          state.totalQuantity = basketUtils.calculateTotalQuantity(
            state.basket
          );
          state.totalPrice = basketUtils.calculateTotalPrice(state.basket);
        }
      }
    },
    // Change the size of an item in the basket
    changeSize(
      state,
      action: PayloadAction<{
        id: string;
        oldPriceAndSizeId: string;
        newPriceAndSizeId: string;
      }>
    ) {
      const { id, oldPriceAndSizeId, newPriceAndSizeId } = action.payload;
      const basketItem = state.basket.find((item) => item.product.id === id);

      if (basketItem) {
        const oldSizeIndex = basketItem.priceAndSizesArray.findIndex(
          (ps) => ps.priceAndSizeItem.id === oldPriceAndSizeId
        );
        const newPriceAndSize = basketItem.product.pricesAndSizes.find(
          (ps) => ps.id === newPriceAndSizeId
        );

        if (oldSizeIndex && newPriceAndSize) {
          const oldSize = basketItem.priceAndSizesArray[oldSizeIndex];
          // Check if the new size already exists in the basket
          const existingNewSize = basketItem.priceAndSizesArray.find(
            (ps) => ps.priceAndSizeItem.id === newPriceAndSizeId
          );

          if (existingNewSize) {
            //Update existing size withe new size quantity and recalculate price
            existingNewSize.quantity += oldSize.quantity;
            existingNewSize.totalPrice +=
              oldSize.quantity * newPriceAndSize.price;

            //remove old size
            basketItem.priceAndSizesArray.splice(oldSizeIndex, 1);
          } else {
            oldSize.priceAndSizeItem = newPriceAndSize;
            oldSize.totalPrice = oldSize.quantity * newPriceAndSize.price;
          }

          basketItem.totalPrice = basketItem.priceAndSizesArray.reduce(
            (acc, size) => acc + size.totalPrice,
            0
          );

          state.totalPrice = state.basket.reduce(
            (acc, item) => acc + item.totalPrice,
            0
          );
        }
      }
    },
  },
});

export const basketSliceActions = basketSlice.actions;
export default basketSlice.reducer;
