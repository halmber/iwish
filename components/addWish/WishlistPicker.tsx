import { Text } from "@/components/ui/";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

interface WishlistPickerProps {
  wishlistId: string;
  setWishlistId: (wishlistId: string) => void;
  wishlists: string[];
}

const WishlistPicker: React.FC<WishlistPickerProps> = ({
  wishlistId,
  setWishlistId,
  wishlists,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-base font-medium mb-2">Wishlist</Text>
      <Picker
        itemStyle={{ color: "white", backgroundColor: "#09090b" }}
        selectedValue={wishlistId}
        onValueChange={(itemValue) => setWishlistId(itemValue)}
        mode="dropdown"
        style={{ color: "white", backgroundColor: "#09090b" }}
        dropdownIconColor="white"
      >
        {wishlists.map((wl) => (
          <Picker.Item
            key={wl}
            label={wl}
            value={wl}
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
