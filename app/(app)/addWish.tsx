import { useEffect, useState } from "react";
import { ScrollView, Alert, View, TouchableOpacity } from "react-native";
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
import { fetchLists } from "@/features/lists/thunks";
import { SafeAreaView } from "react-native-safe-area-context";
import { resetStatus } from "@/features/lists/listsSlice";
import OverlayLoading from "@/components/OverlayLoading";
import ConfirmationModal from "@/components/ConfirmationModal";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Trash2 } from "lucide-react-native";

export default function addWish() {
  const { listId } = useLocalSearchParams<{ listId?: string }>(); // implement temporary :) solution

  const [title, setTitle] = useState("");
  const [desireLvl, setDesireLvl] = useState(1);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("UAH");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [wishlistId, setWishlistId] = useState<string | null>(listId || "");
  const [desiredGiftDate, setDesiredGiftDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.wishes);
  const uid = useAppSelector((state) => state.auth.user?.uid);
  const { data: wishLists } = useAppSelector((state) => state.lists);

  // fetch wishlists
  useEffect(() => {
    dispatch(fetchLists(uid || ""));
  }, [dispatch]);

  // set default wishlist
  useEffect(() => {
    if (wishLists.length > 0 && !wishlistId) {
      setWishlistId(wishLists[0].id);
    }
  }, [wishLists, wishlistId]);

  // set wishlistId when listId is available
  useEffect(() => {
    if (listId) {
      setWishlistId(listId);
    }
  }, [listId]);

  // show status toast
  useEffect(() => {
    if (status === "failed") {
      showToast(`Failed to add wish.\n${error}`, "error");
    } else if (status === "succeeded") {
      setIsModalVisible(true);
      dispatch(resetStatus());
    }
  }, [status]);

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

    const wish = {
      title,
      desireLvl,
      price: parseFloat(price),
      currency,
      url,
      description,
      desiredGiftDate,
    };
    dispatch(addNewWish({ wish, listId: wishlistId || "", userId: uid || "" }));
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDesireLvl(1);
    setPrice("");
    setCurrency("UAH");
    setUrl("");
    setDescription("");
    setDesiredGiftDate(new Date());
  };

  const handleCreateNewList = () => {
    dispatch(resetStatus());
    router.push("/(app)/myWishLists/create");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35] px-6">
      {status === "loading" && <OverlayLoading message="Adding wish..." />}

      <ScrollView className="flex-1">
        <View className="w-full flex  flex-row items-center justify-end mt-4">
          <Text className="text-3xl text-center font-bold absolute left-1/2 -translate-x-1/2">
            Add new Wish
          </Text>
          <TouchableOpacity onPress={() => clearForm()}>
            <Trash2 size={24} color="white" />
          </TouchableOpacity>
        </View>

        <WishlistPicker
          wishlistId={wishlistId || ""}
          wishlists={wishLists}
          setWishlistId={setWishlistId}
          handleCreateNewList={handleCreateNewList}
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

        <ConfirmationModal
          visible={isModalVisible}
          message={"Wish added successfully"}
          title={"Success"}
          onConfirm={() => setIsModalVisible(false)}
          onClose={() => setIsModalVisible(false)}
        />

        <Button onPress={handleSubmit}>
          <Text className="font-bold">Add Wish</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
