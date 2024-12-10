import {
  addDataToCollection,
  createListItem,
} from "@/services/firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Wish } from "./types";

interface AddNewWishPayload {
  wish: Omit<Wish, "id">;
  listId: string;
  userId: string;
}

export const addNewWish = createAsyncThunk<Wish, AddNewWishPayload>(
  "wishes/addNewWish",
  async ({ wish, listId, userId }, { rejectWithValue }) => {
    try {
      const newWish = await createListItem(userId, listId, wish);

      return newWish;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
