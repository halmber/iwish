import { getListItems, getUserLists } from "@/services/firebase/firestore";
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
