import { useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Text, Card, Button } from "@/components/ui/";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchLists } from "@/features/lists/thunks";

export default function myWishLists() {
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector((state) => state.auth.user!);
  const { data: wishLists, status } = useAppSelector((state) => state.lists);

  // Fetch lists on mount
  useEffect(() => {
    if (uid) {
      dispatch(fetchLists(uid));
    }
  }, [dispatch, uid]);

  if (status === "loading") {
    return (
      <View className="flex-1 justify-center items-center bg-[#1e1f35]">
        <ActivityIndicator size="large" color="#ff6347" />
        <Text className="mt-4">Loading lists...</Text>
      </View>
    );
  }

  if (status === "failed") {
    return (
      <View className="flex-1 justify-center items-center bg-[#1e1f35]">
        <Text className="text-lg">
          Failed to load lists. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35] p-6">
      <ScrollView className="flex-1">
        <Text className="text-3xl text-center font-bold my-4">
          My Wishlists
        </Text>

        <View className="flex flex-wrap flex-row justify-between">
          {wishLists.map((list) => (
            <TouchableOpacity
              key={list.id}
              className="w-[48%] mb-4"
              // onPress={() => router.replace("/(app)/wishes")}
            >
              <Card className="bg-[#27293d] p-4">
                <Text className="text-lg font-bold mb-1">{list.name}</Text>

                <Text className="text-sm font-medium text-gray-400 mb-4">
                  {list.type === "public" ? "Public" : "Private"}
                </Text>

                <Text className="text-sm text-gray-300">
                  {list.description || "No description available."}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          className="mt-6"
          // onPress={() => router.replace("createList")}
        >
          <Text className="font-bold">Create New List</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
