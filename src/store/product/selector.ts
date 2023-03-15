import { ApplicationState } from "../store";

export const productSelector = (state: ApplicationState) =>
  state.product.product;

export const productStatus = (state: ApplicationState) => state.product.status;
