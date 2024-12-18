import { useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, Button, Card } from "@/components/ui/";
import { router, useLocalSearchParams } from "expo-router";
import { useAppSelector, useAppDispatch } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteWishlist, fetchListItems } from "@/features/lists/thunks";
import { WishlistHeader, WishlistCard } from "@/components/myWishlists/";
import Error from "@/components/Error";
import { DesireLevelSelector } from "@/components/addWish";
import OverlayLoading from "@/components/OverlayLoading";

export default function WishlistDetails() {
  const { listId } = useLocalSearchParams<{ listId: string }>();
  const dispatch = useAppDispatch();
  const currentWishlist = useAppSelector((state) =>
    state.lists.data.find((list) => list.id === listId),
  );
  const { status, error } = useAppSelector((state) => state.lists);

  useEffect(() => {
    dispatch(fetchListItems(listId));
  }, [dispatch, listId]);

  useEffect(() => {
    if (!currentWishlist && status === "succeeded") {
      router.replace("/(app)/myWishLists");
    }
  }, [status, currentWishlist]);

  if (status === "failed" || !currentWishlist) {
    return <Error message={error || ""} error={error || ""} />;
  }

  const handleDelete = () => {
    dispatch(deleteWishlist(listId));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35]">
      {status === "loading" && <OverlayLoading message="Loading..." />}

      <WishlistHeader
        wishlistName={currentWishlist.name}
        listId={listId}
        handleDelete={handleDelete}
      />

      <ScrollView
        className="flex-1 px-6"
        refreshControl={
          <RefreshControl
            onRefresh={() => dispatch(fetchListItems(listId))}
            refreshing={
              status === "loading" && currentWishlist.items.length !== 0 // when items exist in store, dont do fetch, so there will be no icon
            }
          />
        }
      >
        <WishlistCard
          wishlistName={currentWishlist.name}
          wishlistType={currentWishlist.visibility}
          wishlistDescription={currentWishlist.description}
          descriptionTextize="text-lg"
        />

        <View className="my-6">
          <Text className="text-xl font-bold">Wishes</Text>

          <Button
            className="my-4"
            onPress={() => router.push(`/(app)/addWish?listId=${listId}`)} // temporary :) solution
          >
            <Text className="font-bold">Add New Wish</Text>
          </Button>

          {currentWishlist.items.length !== 0 ? (
            currentWishlist.items.map((wish) => (
              <TouchableOpacity
                key={wish.id}
                onPress={() =>
                  router.push({
                    pathname: `/(app)/myWishLists/[listId]/wish`,
                    params: { listId, wishId: wish.id },
                  })
                }
              >
                <Card key={wish.id} className="bg-[#27293d] p-4 mb-4">
                  <Text className="text-xl font-bold mb-1">{wish.title}</Text>

                  <Text className="text-sm font-bold mb-2 text-gray-400">
                    {wish.price ? `${wish.price} ${wish.currency}` : "N/A"}
                  </Text>

                  <View className="flex-row justify-between">
                    <Text className="text-base font-medium">Desire Level</Text>
                    <DesireLevelSelector desireLvl={wish.desireLvl} />
                  </View>
                </Card>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-lg text-gray-400">No wishes added yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
