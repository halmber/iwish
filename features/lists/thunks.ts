import { getUserLists } from "@/services/firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { List } from "./types";

export const fetchLists = createAsyncThunk<List[], string>(
  "lists/fetchLists",
  async (userId: string) => {
    return await getUserLists(userId);
  },
);
