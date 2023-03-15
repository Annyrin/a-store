import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/products";
import { fetchProducts } from "./thunk";

interface ProductState {
  madeInAlfaProducts: Product[];
  status: string;
}

const NAME = "product";

const initialState: ProductState = {
  madeInAlfaProducts: [],
  status: "loading",
};

export const { actions: madeInAlfaActions, reducer: madeInAlfaReducer } =
  createSlice({
    name: NAME,
    initialState,
    reducers: {},

    extraReducers: (builder) => {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.madeInAlfaProducts = action.payload;
      });
      builder.addCase(fetchProducts.rejected, (state, action) => {
        state.status = String(action.error.message);
      });
    },
  });
