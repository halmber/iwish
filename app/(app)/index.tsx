import { View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebaseAuth } from "@/services/firebase/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Text } from "@/components/ui";
import { clearUser } from "@/features/auth/authActions";
import { Link } from "lucide-react-native";

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
        <Text className="text-base text-gray-400 mb-8">
          {user?.displayName}
        </Text>

        <View className="w-full mb-4 flex-row justify-between">
          <Button onPress={() => router.push("/_sitemap")}>
            <Text>View sitemap</Text>
          </Button>
          <Button variant={"destructive"} onPress={handleLogout}>
            <Text>Sign Out </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
