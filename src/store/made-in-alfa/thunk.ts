import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMadeInAlfaProducts } from "../../api/request";
import { Product } from "../../types/products";
import { fetchAlfaProducts } from "./types";

export const fetchProducts = createAsyncThunk(
  fetchAlfaProducts,
  async (_, thunkApi) => {
    const response = await fetchMadeInAlfaProducts();

    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: "Failed to fetch",
      });
    }
    const data: Product[] = response.data;

    return data;
  }
);
