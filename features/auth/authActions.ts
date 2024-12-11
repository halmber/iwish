import { createAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export const setUser = createAction<User>("auth/setUser");
export const clearUser = createAction("auth/clearUser");
