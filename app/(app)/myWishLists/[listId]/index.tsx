import { useEffect } from "react";
import { ScrollView } from "react-native";
import { Text, Button } from "@/components/ui/";
import { useLocalSearchParams } from "expo-router";
import { useAppSelector, useAppDispatch } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchListItems } from "@/features/lists/thunks";
import { WishlistHeader, WishlistCard } from "@/components/myWishlists/";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function WishlistDetails() {
  const { listId } = useLocalSearchParams<{ listId: string }>();
  const dispatch = useAppDispatch();
  const currentWishlist = useAppSelector((state) =>
    state.lists.data.find((list) => list.id === listId),
  );
  const { status } = useAppSelector((state) => state.lists);

  useEffect(() => {
    if (listId) {
      dispatch(fetchListItems(listId));
    }
  }, [dispatch, listId]);

  if (status === "loading") {
    return <Loading message="Loading wishlist details..." />;
  }

  if (status === "failed" || !currentWishlist) {
    return <Error message="Failed to fetch wishlist details" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35]">
      <WishlistHeader wishlistName={currentWishlist.name} listId={listId} />

      <ScrollView className="flex-1 px-6">
        <WishlistCard
          wishlistName={currentWishlist.name}
          wishlistType={currentWishlist.visibility}
          wishlistDescription={currentWishlist.description}
          descriptionTextize="text-lg"
        />

        <Text className="text-xl font-bold my-4">Wishes</Text>

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
