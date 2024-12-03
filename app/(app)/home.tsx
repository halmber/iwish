import { View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebaseAuth } from "@/firebaseConfig";
import { clearUser } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Text } from "@/components/ui";

export default function Home() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await firebaseAuth.signOut();
    dispatch(clearUser());
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35]">
      <View className="flex-1 p-6 items-center justify-center">
        <Text className="text-3xl font-bold mb-2">Welcome!</Text>
        <Text className="text-base text-gray-400 mb-8">{user?.email}</Text>

        <Button className="w-full" onPress={handleLogout}>
          <Text>Sign Out </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
