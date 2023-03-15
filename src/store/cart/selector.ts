import { ApplicationState } from "../store";

export const cartProduct = (state: ApplicationState) => state.cartProduct;
export const cartProductAmount = (state: ApplicationState) =>
  state.cartProduct.cart.reduce((acc, product) => {
    return acc + product.amount;
  }, 0);
