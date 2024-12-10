import { getUserLists } from "@/services/firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (userId: string) => {
    return await getUserLists(userId);
  },
);
