import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, Input, Button } from "@/components/ui/";
import { router, useLocalSearchParams } from "expo-router";
import { useAppSelector, useAppDispatch } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "lucide-react-native";

export default function EditWishlist() {
  const { listId } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.lists);
  const currentWishlist = useAppSelector((state) =>
    state.lists.data.find((list) => list.id === listId),
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"private" | "public">("private");

  useEffect(() => {
    if (listId) {
      // dispatch(getWishlistItems(listId));
    }
  }, [dispatch, listId]);

  useEffect(() => {
    if (currentWishlist) {
      setName(currentWishlist.name);
      setDescription(currentWishlist.description || "");
      setVisibility(currentWishlist.visibility);
    }
  }, [currentWishlist]);

  const handleSubmit = async () => {
    if (listId) {
      // await dispatch(
      //   updateWishlist({ id: listId as string, name, description }),
      // );
      router.back();
    }
  };

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
          Failed to load wishlist details. Please try again later.lskfa;lsdkflk
        </Text>
        <Text className="text-lg text-red-500">Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35]">
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeftIcon size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white ml-4">
          Edit wishlist info
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        <Text className="text-lg font-bold mb-2">Name:</Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Enter wishlist name"
          className="mb-4"
        />
        <Text className="text-lg font-bold mb-2">Description:</Text>
        <Input
          value={description}
          onChangeText={setDescription}
          placeholder="Enter wishlist description"
          multiline
          numberOfLines={4}
          className="mb-4"
        />

        <View className="mb-4">
          <Text className="text-lg font-bold mb-2">Visibility:</Text>
          <View className="flerx flex-row gap-4">
            <TouchableOpacity
              onPress={() => setVisibility("private")}
              className={`p-2 rounded-md ${
                visibility === "private" ? "bg-[#ff6347]" : "bg-gray-500"
              }`}
            >
              <Text>Private</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisibility("public")}
              className={`p-2 rounded-md ${
                visibility === "public" ? "bg-[#ff6347]" : "bg-gray-500"
              }`}
            >
              <Text>Public</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button className="mt-6" onPress={handleSubmit}>
          <Text className="font-bold">Save Changes</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
