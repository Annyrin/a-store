import { createSlice } from "@reduxjs/toolkit";
import { DeliveryType } from "../../types/cart-products";
import { postOrder } from "./thunk";

const NAME = "order";

interface Order {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment?: string;
  deliveryType: DeliveryType;
  paymentType: "Банковская карта";
  status: string;
}

const initialState: Order = {
  name: "",
  email: "",
  phone: "",
  address: "",
  comment: "",
  deliveryType: "Доставка по России — 350₽",
  paymentType: "Банковская карта",
  status: "",
};

export const { actions: orderActions, reducer: orderReducer } = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setName: (state, { payload }) => {
      state.name = payload;
      state.email = payload.email;
      state.phone = payload.phone;
      state.address = payload.address;
      state.comment = payload.comment;
      state.deliveryType = payload.deliveryType;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});
