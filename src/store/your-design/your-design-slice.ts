import { createSlice } from "@reduxjs/toolkit";
import { YourDesignProducts } from "../../types/products";
import { fetchProducts } from "./thunk";

interface ProductState {
  products: YourDesignProducts[];
  status: string;
}

const NAME = "product";

const initialState: ProductState = {
  products: [],
  status: "loading",
};

export const { actions: yourDesignActions, reducer: yourDesignReducer } =
  createSlice({
    name: NAME,
    initialState,
    reducers: {},

    extraReducers: (builder) => {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      });
      builder.addCase(fetchProducts.rejected, (state, action) => {
        state.status = String(action.error.message);
      });
    },
  });
