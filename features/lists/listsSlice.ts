import { createSlice } from "@reduxjs/toolkit";
import { List } from "./types";
import { fetchLists } from "./thunks";

type ListsState = {
  data: List[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ListsState = {
  data: [],
  status: "idle",
  error: null,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch lists";
      });
  },
});

export default listsSlice.reducer;
