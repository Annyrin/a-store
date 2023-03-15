import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDesignProducts } from "../../api/request";
import { YourDesignProducts } from "../../types/products";
import { fetchYourDesignProducts } from "./types";

export const fetchProducts = createAsyncThunk(
  fetchYourDesignProducts,
  async (_, thunkApi) => {
    const response = await fetchDesignProducts();
    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: "Failed to fetch",
      });
    }
    const data: YourDesignProducts[] = await response.data;
    return data;
  }
);
