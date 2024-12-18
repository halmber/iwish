import { Text } from "@/components/ui/";
import { List } from "@/features/lists/types";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

interface WishlistPickerProps {
  wishlistId: string;
  setWishlistId: (wishlistId: string) => void;
  wishlists: List[];
  handleCreateNewList: () => void;
}

const WishlistPicker: React.FC<WishlistPickerProps> = ({
  wishlistId,
  setWishlistId,
  wishlists,
  handleCreateNewList,
}) => {
  const createNewObj = { id: null, name: "+ Create new" }; // in future will use for create new list after click
  const handleChange = (itemValue: string) => {
    if (itemValue === null) handleCreateNewList();

    setWishlistId(itemValue);
  };

  return (
    <View className="mb-4">
      <Text className="text-base font-medium mb-2">Wishlist</Text>
      <Picker
        itemStyle={{ color: "white", backgroundColor: "#09090b" }}
        selectedValue={wishlistId}
        onValueChange={handleChange}
        mode="dropdown"
        style={{ color: "white", backgroundColor: "#09090b" }}
        dropdownIconColor="white"
      >
        {[...wishlists, createNewObj].map((wl) => (
          <Picker.Item
            key={wl.id}
            label={wl.name}
            value={wl.id}
            style={{
              color: "white",
              backgroundColor: "#09090b",
            }}
          />
        ))}
      </Picker>
    </View>
  );
};

export default WishlistPicker;
