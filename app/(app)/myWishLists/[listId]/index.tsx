import { useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, Button, Card } from "@/components/ui/";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector, useAppDispatch } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, PencilIcon } from "lucide-react-native";

export default function WishlistDetails() {
  const { listId } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const currentWishlist = useAppSelector((state) =>
    state.lists.data.find((list) => list.id === listId),
  );
  const { status } = useAppSelector((state) => state.lists);

  useEffect(() => {
    if (listId) {
      // dispatch(getWishlistItems(listId));
    }
  }, [dispatch, listId]);

  if (status === "loading") {
    return (
      <View className="flex-1 justify-center items-center bg-[#1e1f35]">
        <ActivityIndicator size="large" color="#ff6347" />
        <Text className="mt-4">Loading wishlist details...</Text>
      </View>
    );
  }

  if (status === "failed" || !currentWishlist) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1e1f35]">
        <Text className="text-lg">
          Failed to load wishlist details. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35]">
      <View className="flex-row justify-between items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeftIcon size={24} color="#fff" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold">{currentWishlist.name}</Text>

        <TouchableOpacity
          onPress={() => router.push(`/(app)/myWishLists/${listId}/edit`)}
        >
          <PencilIcon size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6">
        <Card className="bg-[#27293d] p-4 mb-4">
          <Text className="text-lg font-bold mb-1">{currentWishlist.name}</Text>

          <Text className="text-sm font-medium text-gray-400 mb-4">
            {currentWishlist.type === "public" ? "Public" : "Private"}
          </Text>

          <Text className="text-lg text-gray-300">
            {currentWishlist.description || "No description available."}
          </Text>
        </Card>

        <Text className="text-xl font-bold mb-4">Wishes</Text>

        <Button
          className="mt-6"
          // onPress={() => router.push(`/(app)/addWish/${listId}`)}
        >
          <Text className="font-bold">Add New Wish</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
