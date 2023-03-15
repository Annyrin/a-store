import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSpecificProduct } from "../../api/request";
import { CustomProducts } from "../../types/products";
import { fetchProductPage } from "./types";

export const fetchProduct = createAsyncThunk(
  fetchProductPage,
  async (id: string, thunkApi) => {
    const response = await fetchSpecificProduct(id);
    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: "Failed to fetch",
      });
    }
    const data: CustomProducts = await response.data;
    return data;
  }
);
