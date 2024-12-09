import { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Input, Button, Text } from "@/components/ui/";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import WishlistPicker from "@/components/addWish/WishlistPicker";
import DesireLevelSelector from "@/components/addWish/DesireLevelSelector";
import PriceInputs from "@/components/addWish/PriceInputs";

export default function addWish() {
  const [title, setTitle] = useState("");
  const [desireLvl, setDesireLvl] = useState(1);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("UAH");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [wishlistId, setWishlistId] = useState(""); // now uses like a list name
  const [desiredGiftDate, setDesiredGiftDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    Alert.alert(type === "success" ? "Success" : "Error", message);
  };

  const pickDate = (_event: DateTimePickerEvent, date?: Date | undefined) => {
    setShowDatePicker(false);
    if (date) {
      setDesiredGiftDate(date);
    }
  };

  const handleSubmit = async () => {
    if (title.length === 0 || title.length > 100) {
      showToast(
        "Title is required and must be less than 100 characters",
        "error",
      );
      return;
    }

    const newWish = {
      title,
      desireLvl,
      price: parseFloat(price),
      currency,
      url,
      description,
      wishlistId,
      desiredGiftDate,
    };

    try {
      showToast("Wish added successfully", "success");
    } catch (error) {
      showToast("Failed to add wish", "error");
    }
  };

  const wishLists = ["My wishlist", "+ Create new list"];

  return (
    <View className="flex-1 bg-[#1e1f35] p-6">
      <SafeAreaView className="my-4">
        <Text className="text-3xl text-center font-bold">Add new Wish</Text>
      </SafeAreaView>

      <ScrollView className="flex-1">
        <WishlistPicker
          wishlistId={wishlistId}
          wishlists={wishLists}
          setWishlistId={setWishlistId}
        />

        <View className="mb-4">
          <Text className="text-base font-medium mb-2">Title</Text>
          <Input
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        <DesireLevelSelector
          desireLvl={desireLvl}
          setDesireLvl={setDesireLvl}
        />

        <PriceInputs
          price={price}
          setPrice={setPrice}
          currency={currency}
          setCurrency={setCurrency}
        />

        <View className="mb-4">
          <Text className="text-base font-medium mb-2">URL</Text>
          <Input
            placeholder="URL"
            value={url}
            onChangeText={setUrl}
            keyboardType="url"
          />
        </View>

        <View className="mb-4">
          <Text className="text-base font-medium mb-2">Description</Text>
          <Input
            placeholder="Write about your wish"
            value={description}
            onChangeText={setDescription}
            multiline
            style={{
              height: 100,
              textAlignVertical: "top",
              paddingVertical: 10,
            }}
          />
        </View>

        <View className="mb-4 flex-row justify-between">
          <Text className="text-base font-medium mb-2">Desired Gift Date</Text>

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text className="text-xl text-[#ff6347]">
              {desiredGiftDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={desiredGiftDate}
              mode="date"
              display="default"
              onChange={pickDate}
            />
          )}
        </View>

        <Button onPress={handleSubmit}>
          <Text className="font-bold">Add Wish</Text>
        </Button>
      </ScrollView>
    </View>
  );
}
