import { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Input, Button, Text } from "@/components/ui/";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import WishlistPicker from "@/components/addWish/WishlistPicker";

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

  const currencyOptions = ["UAH", "USD", "EUR", "GBP"];
  const defireLvls = [1, 2, 3, 4, 5];
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

        <View className="flex-row justify-between mb-4">
          <Text className="text-base font-medium mb-2">Desire Level</Text>
          <View className="flex-row gap-2">
            {defireLvls.map((level) => (
              <TouchableOpacity key={level} onPress={() => setDesireLvl(level)}>
                <FontAwesome
                  name="heart"
                  size={20}
                  color={level <= desireLvl ? "red" : "gray"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-4 flex-row justify-between">
          <View className="w-1/3">
            <Text className="text-base font-medium mb-2">Price</Text>
            <Input
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              maxLength={10}
              style={{ height: 50, fontSize: 18 }}
            />
          </View>

          <View className="w-[35%] ml-4">
            <Text className="text-base font-medium mb-2">Currency</Text>
            <Picker
              itemStyle={{ color: "white", backgroundColor: "#09090b" }}
              selectedValue={currency}
              onValueChange={(itemValue) => setCurrency(itemValue)}
              mode="dropdown"
              style={{
                color: "white",
                backgroundColor: "#09090b",
              }}
              dropdownIconColor="white"
            >
              {currencyOptions.map((cur) => (
                <Picker.Item
                  key={cur}
                  label={cur}
                  value={cur}
                  style={{
                    color: "white",
                    backgroundColor: "#09090b",
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>

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
