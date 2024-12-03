import { Redirect } from "expo-router";
import { useAppSelector } from "@/store";

export default function Index() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return <Redirect href={isAuthenticated ? "/(app)/home" : "/(auth)/login"} />;
}
