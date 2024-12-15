import { View, ScrollView, Pressable, Linking } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store";
import { router, useLocalSearchParams } from "expo-router";
import OverlayLoading from "@/components/OverlayLoading";
import { Text } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import WishlistHeader from "@/components/myWishlists/WishlistHeader";
import { selectWish } from "@/features/lists/selectors";
import { InfoRow } from "@/components/wish";
import { DesireLevelSelector } from "@/components/addWish";
import { deleteWishThunk } from "@/features/lists/thunks";
import { useEffect } from "react";

export default function Wish() {
  const { listId, wishId } = useLocalSearchParams<{
    listId: string;
    wishId: string;
  }>();
  const dispatch = useAppDispatch();

  const wish = useAppSelector((state) => selectWish(state, listId, wishId));
  const status = useAppSelector((state) => state.lists.status);

  useEffect(() => {
    if (!wish && status === "succeeded") {
      router.back();
    }
  }, [wish, status]);

  const handleDelete = () => {
    if (wish) {
      dispatch(deleteWishThunk({ listId, wishId }));
    }
  };

  const openURL = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (_) {
      alert("Unable to open the URL. Please check the link.");
    }
  };

  const formatGiftDate = (date: { seconds: number }) => {
    return new Date(date.seconds * 1000).toLocaleDateString();
  };

  const shortenURL = (url: string, maxLength = 30) => {
    if (url.length <= maxLength) return url;
    const domain = new URL(url).hostname;
    return `${domain}...${url.slice(-10)}`;
  };

  if (!wish) {
    return (
      <View className="flex-1 bg-[#1e1f35] justify-center items-center">
        <Text className="text-lg">Wishlist or Wish not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35]">
      {status === "loading" && <OverlayLoading message="Loading..." />}

      <WishlistHeader
        wishlistName={wish.title}
        listId={listId}
        handleDelete={handleDelete}
        handleEdit={() => {
          router.push(
            `/(app)/myWishLists/${listId}/wish/edit?wishId=${wishId}`,
          );
        }}
      />

      <ScrollView className="px-6 py-4">
        <View
          key={wish.id}
          className="bg-[#2e2f45] rounded-lg p-6 mb-6 shadow-md"
        >
          <Text className="text-2xl font-bold mb-4">{wish.title}</Text>

          <View className="space-y-4">
            <InfoRow
              label="Desire Level"
              value={<DesireLevelSelector desireLvl={wish.desireLvl} />}
            />
            <InfoRow
              label="Price"
              value={wish.price ? `${wish.price} ${wish.currency}` : "N/A"}
            />
            <InfoRow
              label="URL"
              value={
                wish.url ? (
                  <Pressable onPress={() => openURL(wish.url)}>
                    <Text className="text-lg text-blue-500 underline">
                      {shortenURL(wish.url)}
                    </Text>
                  </Pressable>
                ) : (
                  "N/A"
                )
              }
            />
            <InfoRow
              label="Desired Gift Date"
              value={formatGiftDate(
                wish.desiredGiftDate as any as { seconds: number }, // TODO: remove any. firebase value is obj with seconds, not Date
              )}
            />
            <View className="pb-3">
              <Text className="text-lg text-gray-400 font-semibold mb-2">
                Description
              </Text>
              <Text className="text-lg">
                {wish.description || "No description"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
