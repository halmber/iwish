import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const selectWish = createSelector(
  [
    (state: RootState) => state.lists.data,
    (_: RootState, listId: string) => listId,
    (_: RootState, __: string, wishId: string) => wishId,
  ],
  (lists, listId, wishId) => {
    const wishlist = lists.find((list) => list.id === listId);
    return wishlist?.items.find((item) => item.id === wishId) || null;
  },
);
