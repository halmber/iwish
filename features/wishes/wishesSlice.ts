import { createSlice } from "@reduxjs/toolkit";
import { Wish } from "./types";
import { addNewWish } from "./thunks";

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
  extraReducers: (builder) => {
    builder
      .addCase(addNewWish.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewWish.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addNewWish.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default wishesSlice.reducer;
