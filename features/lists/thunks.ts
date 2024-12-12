import {
  createList,
  deleteList,
  getListItems,
  getUserLists,
} from "@/services/firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { List } from "./types";
import { RootState } from "@/store";
import { Wish } from "../wishes/types";

export const fetchLists = createAsyncThunk<List[], string>(
  "lists/fetchLists",
  async (userId: string) => {
    return await getUserLists(userId);
  },
);

export const fetchListItems = createAsyncThunk<
  { wihes: Wish[]; listId: string },
  string
>("lists/fetchListItems", async (listId, { getState }) => {
  const state = getState() as RootState;

  const userId = state.auth.user?.uid || "";
  const wihes = await getListItems<Wish>(userId, listId);

  return { wihes, listId };
});

export const createWishlist = createAsyncThunk<
  List,
  Omit<List, "id" | "items" | "createdAt">
>(
  "lists/createWishlist",
  async ({ name, visibility, description, type }, { getState }) => {
    const state = getState() as RootState;

    const userId = state.auth.user?.uid || "";
    const newWishlist = await createList(
      userId,
      name,
      type,
      visibility,
      description,
    );

    return newWishlist;
  },
);

export const deleteWishlist = createAsyncThunk<void, string>(
  "lists/deleteWishlist",
  async (listId, { getState }) => {
    const state = getState() as RootState;
    const userId = state.auth.user?.uid || "";

    if (state.lists.data.length === 1) {
      throw new Error("Cannot delete last list. There must be at least one.");
    }

    await deleteList(userId, listId);
  },
);
