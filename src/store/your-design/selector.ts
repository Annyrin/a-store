import { ApplicationState } from "../store";

export const yourDesignProductsSelector = (state: ApplicationState) =>
  state.yourDesign.products;

export const yourDesignProductsStatus = (state: ApplicationState) =>
  state.yourDesign.status;
