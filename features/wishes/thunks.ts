import { addDataToCollection } from "@/firebaseConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Wish } from "./types";

export const addNewWish = createAsyncThunk(
  "wishes/addNewWish",
  async (wish: Omit<Wish, "id">, { rejectWithValue }) => {
    try {
      const newWish = await addDataToCollection("wishes", wish);

      return newWish;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
