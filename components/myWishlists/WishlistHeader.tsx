import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/";
import { PencilIcon, ChevronLeftIcon, Trash2 } from "lucide-react-native";
import { router } from "expo-router";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";

export interface WishlistHeaderProps {
  wishlistName: string;
  listId: string;
  handleDelete: () => void;
  handleEdit?: () => void;
}

const WishlistHeader: React.FC<WishlistHeaderProps> = ({
  wishlistName,
  listId,
  handleDelete,
  handleEdit = () => router.push(`/(app)/myWishLists/${listId}/edit`),
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    handleDelete();
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <Text className="pt-3 text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
        {wishlistName}
      </Text>

      <View className="flex-row justify-between items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeftIcon size={24} color="#fff" />
        </TouchableOpacity>

        <View className="flex flex-row gap-4">
          <TouchableOpacity onPress={handleEdit}>
            <PencilIcon size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Trash2 size={24} color="red" />
          </TouchableOpacity>
        </View>

        <ConfirmationModal
          visible={isModalVisible}
          onClose={() => setModalVisible(!isModalVisible)}
          onConfirm={handleConfirm}
          title="Confirm Deletion"
          message="Are you sure you want to delete this wishlist?"
          confirmText="Delete"
        />
      </View>
    </View>
  );
};

export default WishlistHeader;
