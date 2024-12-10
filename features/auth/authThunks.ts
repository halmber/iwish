import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Unsubscribe,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "@/services/firebase/config";
import { setUser } from "./authSlice";
import { AuthCredentials, RegisterCredentials } from "./types";
import { AppThunk } from "@/store";
import { clearUser } from "./authSlice";
import { createList, createUser } from "@/services/firebase/firestore";

export const monitorAuthState = (): AppThunk<Unsubscribe> => (dispatch) => {
  return onAuthStateChanged(firebaseAuth, (user) => {
    if (!user) {
      dispatch(clearUser());
      return;
    }
    dispatch(setUser(user));
  });
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: AuthCredentials, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      return user;
    } catch (error) {
      return rejectWithValue("Invalid email or password");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, password, confirmPassword, username }: RegisterCredentials,
    { rejectWithValue },
  ) => {
    if (password !== confirmPassword) {
      return rejectWithValue("Passwords do not match");
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      await Promise.all([
        updateProfile(user, { displayName: username }),
        createUser(user.uid, username, email),
        createList(user.uid, "My Wishlist", "wishlist", "private"),
      ]);

      const updatedUser = { ...user };
      updatedUser.displayName = username;

      return updatedUser;
    } catch (error) {
      return rejectWithValue(`Failed to create account: ${error}`);
    }
  },
);
