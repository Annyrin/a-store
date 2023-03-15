import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "../../types/cart-products";

const NAME = "product";

interface CartState {
  cart: CartProduct[];
}

const initialState: CartState = {
  cart: [],
};

const generateProductId = (product: CartProduct) => {
  return (
    product.id +
    (product.color ?? "") +
    (product.size ?? "") +
    (product.model ?? "") +
    (product.stickerNumber ?? "")
  );
};

const findProduct = (productArray: CartProduct[], productId: string) => {
  return productArray.find((product) => product.productId === productId);
};

export const { actions: cartActions, reducer: cartReducer } = createSlice({
  name: NAME,
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const productId = generateProductId(payload);
      const product = findProduct(state.cart, productId);

      if (!product) {
        state.cart.push({ ...payload, amount: 1, productId });
      } else {
        product.amount += 1;
      }
    },
    incrementAmount: (state, { payload }) => {
      const product = findProduct(state.cart, payload);

      if (product && product.amount) {
        product.amount += 1;
      }
    },
    decrementAmount: (state, { payload }) => {
      const product = findProduct(state.cart, payload);
      if (product && product.amount > 0) {
        product.amount -= 1;
      } else {
        state.cart.filter((prod) => prod.id !== product?.id);
      }
    },
    removeFromCart: (state, { payload }) => {
      const product = findProduct(state.cart, payload);
      if (product) {
        product.amount = 0;
      }
      state.cart.filter((prod) => prod.id !== product?.id);
    },
  },
});
