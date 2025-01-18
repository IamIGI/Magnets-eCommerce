import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceAndSizes, Product } from '../../../api/magnetsServer/generated';

interface CartState {
  basket: {
    product: Product;
    priceAndSizes: {
      priceAndSize: PriceAndSizes;
      quantity: number;
      totalPrice: number;
    }[];
    totalPrice: number;
  }[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
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
    addItem(
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
        (item) => item.product.id === product.id
      );

      if (existingProduct) {
        const existingSize = existingProduct.priceAndSizes.find(
          (ps) => ps.priceAndSize.id === priceAndSizeId
        );

        if (existingSize) {
          existingSize.quantity += quantity;
          existingSize.totalPrice += selectedPriceAndSize.price * quantity;
        } else {
          existingProduct.priceAndSizes.push({
            priceAndSize: selectedPriceAndSize,
            quantity,
            totalPrice: selectedPriceAndSize.price * quantity,
          });
        }

        existingProduct.totalPrice += selectedPriceAndSize.price * quantity;
      } else {
        state.basket.push({
          product,
          priceAndSizes: [
            {
              priceAndSize: selectedPriceAndSize,
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
    removeItem(
      state,
      action: PayloadAction<{ productId: string; priceAndSizeId: string }>
    ) {
      const { productId, priceAndSizeId } = action.payload;
      const productIndex = state.basket.findIndex(
        (item) => item.product.id === productId
      );

      if (productIndex !== -1) {
        const product = state.basket[productIndex];
        const sizeIndex = product.priceAndSizes.findIndex(
          (ps) => ps.priceAndSize.id === priceAndSizeId
        );

        if (sizeIndex !== -1) {
          const size = product.priceAndSizes[sizeIndex];
          state.totalQuantity -= size.quantity;
          state.totalPrice -= size.totalPrice;

          product.priceAndSizes.splice(sizeIndex, 1);

          if (product.priceAndSizes.length === 0) {
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
      const product = state.basket.find(
        (item) => item.product.id === productId
      );

      if (product) {
        const priceAndSizeItem = product.priceAndSizes.find(
          (ps) => ps.priceAndSize.id === priceAndSizeId
        );

        if (priceAndSizeItem) {
          const pricePerUnit =
            priceAndSizeItem.totalPrice / priceAndSizeItem.quantity;
          state.totalQuantity += quantity - priceAndSizeItem.quantity;
          state.totalPrice +=
            (quantity - priceAndSizeItem.quantity) * pricePerUnit;
          product.totalPrice +=
            (quantity - priceAndSizeItem.quantity) * pricePerUnit;

          priceAndSizeItem.quantity = quantity;
          priceAndSizeItem.totalPrice = pricePerUnit * quantity;
        }
      }
    },
  },
});

export const basketSliceActions = basketSlice.actions;
export default basketSlice.reducer;
