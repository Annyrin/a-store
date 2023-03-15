import { createAsyncThunk } from "@reduxjs/toolkit";
import { postProduct } from "../../api/request";
import { Order } from "../../types/cart-products";
import { order } from "./types";

export const postOrder = createAsyncThunk(
  order,
  async (payload: Order, thunkApi) => {
    const response = await postProduct(payload);
    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: "Failed to post",
      });
    }
    const data = response.statusText;
    return data;
  }
);
