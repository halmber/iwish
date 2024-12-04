import { useEffect } from "react";
import { router, Stack } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store";
import { monitorAuthState } from "@/features/auth/authThunks";

export default function AuthLayout() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(monitorAuthState());
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(app)/home");
    }
  }, [isAuthenticated]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
