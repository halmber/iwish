import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { router } from "expo-router";
import { Text, Input, Button } from "@/components/ui/";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ChevronLeftIcon } from "lucide-react-native";
import Error from "@/components/Error";
import { createWishlist } from "@/features/lists/thunks";
import { resetStatus } from "@/features/lists/listsSlice";
import OverlayLoading from "@/components/OverlayLoading";

export default function CreateWishlist() {
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.lists);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"private" | "public">("private");

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatus());
      router.replace("/(app)/myWishLists");
    } else if (status === "failed") {
      dispatch(resetStatus());
    }
  }, [status]);

  const handleCreate = () => {
    dispatch(
      createWishlist({ name, description, visibility, type: "wishlist" }),
    );
  };

  if (status === "failed") {
    return <Error message="Failed to create wishlist." error={error || ""} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35]">
      {status === "loading" && (
        <OverlayLoading message="Creating wishlist..." />
      )}

      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeftIcon size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white ml-4">
          Create a new wishlist
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        <Text className="text-lg font-bold mb-2">Name</Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Enter wishlist name"
          className="mb-4"
        />
        <Text className="text-lg font-bold mb-2">Description</Text>
        <Input
          value={description}
          onChangeText={setDescription}
          placeholder="Enter wishlist description"
          multiline
          numberOfLines={4}
          className="mb-4"
        />

        <View className="mb-4">
          <Text className="text-lg font-bold mb-2">Visibility</Text>
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

        <Button className="mt-6" onPress={handleCreate}>
          <Text className="font-bold">Create wishlist</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
