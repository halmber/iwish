import { useState, useEffect } from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, Text } from "@/components/ui/";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginUser, monitorAuthState } from "@/features/auth/authThunks";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(monitorAuthState());
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) router.replace("/(app)/home");
  }, [isAuthenticated]);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35]">
      <View className="flex-1 p-6 justify-center">
        <Text className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </Text>
        <Text className="text-base text-gray-400 text-center mb-8">
          Sign in to continue
        </Text>

        {error ? (
          <Text className="text-red-500 text-center mb-4">{error}</Text>
        ) : null}

        <Input
          className="mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          className="mb-6"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          className="mb-6"
          onPress={handleLogin}
          disabled={!email || !password}
        >
          <Text>Sign In</Text>
        </Button>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/(auth)/register" className="text-blue-500">
            Sign Up
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
