import { createSlice } from "@reduxjs/toolkit";
import { List } from "./types";
import {
  createWishlist,
  deleteWishlist,
  deleteWishThunk,
  fetchListItems,
  fetchLists,
  updateWishlist,
  updateWishThunk,
} from "./thunks";

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
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
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
      })
      // fetch list items
      .addCase(fetchListItems.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchListItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.data.findIndex(
          (list) => list.id === action.meta.arg,
        );
        state.data[index].items = action.payload.wihes;
      })
      .addCase(fetchListItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch list items";
      })
      // create list
      .addCase(createWishlist.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(createWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create wishlist";
      })
      // delete list
      .addCase(deleteWishlist.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter((list) => list.id !== action.meta.arg);
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete wishlist";
      })
      // update list
      .addCase(updateWishlist.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateWishlist.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (list) => list.id === action.meta.arg.listId,
        );
        state.data[index] = { ...state.data[index], ...action.payload };
        state.status = "succeeded";
      })
      .addCase(updateWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update wishlist";
      })
      // delete wish
      .addCase(deleteWishThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteWishThunk.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (list) => list.id === action.meta.arg.listId,
        );
        state.data[index].items = state.data[index].items.filter(
          (item) => item.id !== action.meta.arg.wishId,
        );
        state.status = "succeeded";
      })
      .addCase(deleteWishThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete wish";
      })
      // update wish
      .addCase(updateWishThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateWishThunk.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (list) => list.id === action.meta.arg.listId,
        );
        state.data[index].items = state.data[index].items.map((item) => {
          if (item.id === action.meta.arg.wishId) {
            return { ...item, ...action.meta.arg.updatedData };
          }
          return item;
        });
        state.status = "succeeded";
      })
      .addCase(updateWishThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update wish";
      });
  },
});

export const { resetStatus } = listsSlice.actions;
export default listsSlice.reducer;
