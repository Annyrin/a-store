import { ApplicationState } from "../store";

export const orderDeliveryType = (state: ApplicationState) =>
  state.order.deliveryType;

export const orderStatus = (state: ApplicationState) => state.order.status;
