import { PageTitleWithBackBtn } from "@/components/myWishlists";
import { Button, Text } from "@/components/ui";
import { selectWish } from "@/features/lists/selectors";
import { updateWishThunk } from "@/features/lists/thunks";
import { useAppDispatch, useAppSelector } from "@/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { useState } from "react";
import {
  DescriptionInput,
  DesireLevelSelector,
  GiftDateSelector,
  PriceInputs,
  TitleInput,
  UrlInput,
} from "@/components/addWish";
import { SafeAreaView } from "react-native-safe-area-context";
import OverlayLoading from "@/components/OverlayLoading";
import Error from "@/components/Error";

export default function EditWish() {
  const { listId, wishId } = useLocalSearchParams<{
    listId: string;
    wishId: string;
  }>();

  const wish = useAppSelector((state) => selectWish(state, listId, wishId));
  const { status, error } = useAppSelector((state) => state.lists);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: wish?.title || "",
    desireLvl: wish?.desireLvl || 1,
    price: wish?.price,
    currency: wish?.currency || "UAH",
    url: wish?.url || "",
    description: wish?.description || "",
    desiredGiftDate: wish?.desiredGiftDate || new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (
    field: keyof typeof formData,
    value: (typeof formData)[keyof typeof formData],
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = async () => {
    await dispatch(
      updateWishThunk({
        wishId: wishId,
        listId: listId,
        updatedData: formData,
      }),
    ).unwrap();
    router.back();
  };

  if (status === "failed") {
    return <Error message="Failed to update wish data" error={error || ""} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1e1f35]">
      <PageTitleWithBackBtn title="Edit Wish" />

      {status === "loading" && <OverlayLoading message="Loading..." />}

      <ScrollView className="flex-1 px-6">
        <TitleInput
          title={formData.title}
          setTitle={(title) => handleInputChange("title", title)}
        />

        <View className="flex-row justify-between my-1">
          <Text className="text-base font-medium">Desire Level</Text>
          <DesireLevelSelector
            desireLvl={formData.desireLvl}
            setDesireLvl={(desireLvl) =>
              handleInputChange("desireLvl", desireLvl)
            }
            classname="mb-4"
          />
        </View>

        <PriceInputs
          price={String(formData.price)}
          setPrice={(price) => handleInputChange("price", price)}
          currency={formData.currency}
          setCurrency={(currency) => handleInputChange("currency", currency)}
        />
        <UrlInput
          url={formData.url}
          setUrl={(url) => handleInputChange("url", url)}
        />
        <DescriptionInput
          description={formData.description}
          setDescription={(description) =>
            handleInputChange("description", description)
          }
        />
        <GiftDateSelector
          desiredGiftDate={
            new Date(
              (formData.desiredGiftDate as any as { seconds: number }).seconds *
                1000,
            ) // TODO: remove any. firebase value is obj with seconds, not Date
          }
          setDesiredGiftDate={(date) =>
            handleInputChange("desiredGiftDate", date)
          }
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
        />

        <Button onPress={handleSave}>
          <Text>Save</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
