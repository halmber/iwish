import { createSlice } from "@reduxjs/toolkit";
import { Wish } from "./types";

interface WishesState {
  items: Wish[];
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: WishesState = {
  items: [],
  error: null,
  status: "idle",
};

const wishesSlice = createSlice({
  name: "wishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default wishesSlice.reducer;
