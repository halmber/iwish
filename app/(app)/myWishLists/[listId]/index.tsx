import { useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, Button, Card } from "@/components/ui/";
import { useLocalSearchParams } from "expo-router";
import { useAppSelector, useAppDispatch } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchListItems } from "@/features/lists/thunks";
import { WishlistHeader, WishlistCard } from "@/components/myWishlists/";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { DesireLevelSelector } from "@/components/addWish";

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

  const handleDelete = () => {
    //   console.log(`Deleted wishlist with ID: ${listId}`);
    //   setModalVisible(!isModalVisible);
    // };
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35]">
      <WishlistHeader
        wishlistName={currentWishlist.name}
        listId={listId}
        handleDelete={handleDelete}
      />

      <ScrollView className="flex-1 px-6">
        <WishlistCard
          wishlistName={currentWishlist.name}
          wishlistType={currentWishlist.visibility}
          wishlistDescription={currentWishlist.description}
          descriptionTextize="text-lg"
        />

        <View className="my-4">
          <Text className="text-xl font-bold my-4">Wishes</Text>

          {currentWishlist.items.length !== 0 ? (
            currentWishlist.items.map((wish) => (
              <TouchableOpacity key={wish.id} onPress={() => {}}>
                <Card key={wish.id} className="bg-[#27293d] p-4 mb-4">
                  <Text className="text-xl font-bold mb-2">{wish.title}</Text>
                  <Text className="text-sm text-gray-300 mb-2">
                    {wish.description || "No description available."}
                  </Text>
                  <Text className="text-sm font-bold mb-2">
                    {wish.price} {wish.currency}
                  </Text>
                  <DesireLevelSelector desireLvl={wish.desireLvl} />
                </Card>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-lg text-gray-400">No wishes added yet.</Text>
          )}
        </View>

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
