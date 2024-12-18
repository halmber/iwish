import { useState } from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, Text } from "@/components/ui/";
import { useAppDispatch, useAppSelector } from "@/store";
import { registerUser } from "@/features/auth/authThunks";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleRegister = () => {
    dispatch(registerUser({ email, password, confirmPassword, username }));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35] ">
      <View className="flex-1 p-6 justify-center">
        <Text className="text-3xl font-bold text-center mb-2">
          Create Account
        </Text>
        <Text className="text-base text-gray-400 text-center mb-8">
          Sign up to get started
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
          className="mb-4"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Input
          className="mb-4"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Input
          className="mb-6"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Button
          className="mb-6"
          onPress={handleRegister}
          disabled={!email || !password || !confirmPassword || !username}
        >
          <Text>Sign Up</Text>
        </Button>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/(auth)/login" className="text-blue-500">
            Sign In
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
