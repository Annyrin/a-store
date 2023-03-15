import { createSlice } from "@reduxjs/toolkit";
import { CustomProducts } from "../../types/products";
import { fetchProduct } from "./thunk";

interface ProductState {
  product: CustomProducts | null;
  status: string;
}

const NAME = "product";

const initialState: ProductState = {
  product: null,
  status: "loading",
};

export const { actions: productActions, reducer: productReducer } = createSlice(
  {
    name: NAME,
    initialState,
    reducers: {
      clearProductPage: (state) => {
        state.status = "loading";
        state.product = initialState.product;
      },
    },

    extraReducers: (builder) => {
      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.product = action.payload;
      });

      builder.addCase(fetchProduct.rejected, (state, action) => {
        state.status = String(action.error.message);
        state.product = initialState.product;
      });
    },
  }
);
