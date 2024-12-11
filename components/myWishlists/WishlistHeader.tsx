import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/";
import { PencilIcon, ChevronLeftIcon } from "lucide-react-native";
import { router } from "expo-router";

export interface WishlistHeaderProps {
  wishlistName: string;
  listId: string;
}

const WishlistHeader: React.FC<WishlistHeaderProps> = ({
  wishlistName,
  listId,
}) => {
  return (
    <View className="flex-row justify-between items-center px-6 py-4">
      <TouchableOpacity onPress={() => router.back()}>
        <ChevronLeftIcon size={24} color="#fff" />
      </TouchableOpacity>

      <Text className="text-2xl font-bold">{wishlistName}</Text>

      <TouchableOpacity
        onPress={() => router.push(`/(app)/myWishLists/${listId}/edit`)}
      >
        <PencilIcon size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default WishlistHeader;
