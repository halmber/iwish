import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Unsubscribe,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "@/firebaseConfig";
import { setUser } from "./authSlice";
import { AuthCredentials, RegisterCredentials } from "./types";
import { AppThunk } from "@/store";
import { clearUser } from "./authSlice";

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
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      return userCredential.user;
    } catch (error) {
      return rejectWithValue("Invalid email or password");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, password, confirmPassword }: RegisterCredentials,
    { rejectWithValue },
  ) => {
    if (password !== confirmPassword) {
      return rejectWithValue("Passwords do not match");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      return userCredential.user;
    } catch (error) {
      return rejectWithValue("Failed to create account");
    }
  },
);
