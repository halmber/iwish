import { useEffect } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Text, Button } from "@/components/ui/";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchLists } from "@/features/lists/thunks";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { WishlistCard } from "@/components/myWishlists/";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { resetStatus } from "@/features/lists/listsSlice";
import OverlayLoading from "@/components/OverlayLoading";

export default function myWishLists() {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.auth.user?.uid);
  const { data: wishLists, status } = useAppSelector((state) => state.lists);

  // Fetch lists on mount
  useEffect(() => {
    if (uid) {
      dispatch(fetchLists(uid));
    }
  }, [dispatch, uid]);

  if (status === "failed") {
    return <Error message="Failed to fetch wishlists" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35] px-6">
      {status === "loading" && (
        <OverlayLoading message="Loading wishlists..." />
      )}

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="text-3xl text-center font-bold my-4">
          My Wishlists
        </Text>

        <View className="flex flex-wrap flex-row justify-between">
          {wishLists.map((list) => (
            <TouchableOpacity
              key={list.id}
              className="w-[48%] mb-4"
              onPress={() => router.push(`/(app)/myWishLists/${list.id}`)}
            >
              <WishlistCard
                wishlistName={list.name}
                wishlistType={list.visibility}
                wishlistDescription={list.description}
                descriptionTextize="text-sm"
              />
            </TouchableOpacity>
          ))}
        </View>

        <Button
          className="my-6"
          onPress={() => {
            dispatch(resetStatus());
            router.push("/(app)/myWishLists/create");
          }}
        >
          <Text className="font-bold">Create New List</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
