import { useState } from "react";
import { View, ScrollView, Alert, SafeAreaView } from "react-native";
import { Button, Text } from "@/components/ui/";
import {
  GiftDateSelector,
  PriceInputs,
  WishlistPicker,
  DesireLevelSelector,
  DescriptionInput,
  TitleInput,
  UrlInput,
} from "@/components/addWish";
import { addNewWish } from "@/features/wishes/thunks";
import { useAppDispatch, useAppSelector } from "@/store";

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

  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.wishes.error);

  const showToast = (message: string, type: "success" | "error") => {
    Alert.alert(type === "success" ? "Success" : "Error", message);
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
      await dispatch(addNewWish(newWish));
      showToast("Wish added successfully", "success");
    } catch (_error) {
      showToast(`Failed to add wish.\n${error}`, "error");
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
        <TitleInput title={title} setTitle={setTitle} />
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
        <UrlInput url={url} setUrl={setUrl} />
        <DescriptionInput
          description={description}
          setDescription={setDescription}
        />
        <GiftDateSelector
          desiredGiftDate={desiredGiftDate}
          setDesiredGiftDate={setDesiredGiftDate}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
        />

        <Button onPress={handleSubmit}>
          <Text className="font-bold">Add Wish</Text>
        </Button>
      </ScrollView>
    </View>
  );
}
