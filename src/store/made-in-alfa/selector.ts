import { ApplicationState } from "../store";

export const madeInAlfaProductsSelector = (state: ApplicationState) =>
  state.madeInAlfa.madeInAlfaProducts;

export const madeInAlfaProductsStatus = (state: ApplicationState) =>
  state.madeInAlfa.status;
