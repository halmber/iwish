import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/";
import { router } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";

export interface PageTitleWithBackBtnProps {
  title: string;
}

const PageTitleWithBackBtn: React.FC<PageTitleWithBackBtnProps> = ({
  title,
}) => {
  return (
    <View className="flex-row items-center px-6 py-4">
      <TouchableOpacity onPress={() => router.back()}>
        <ChevronLeftIcon size={24} color="#fff" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-white ml-4">{title}</Text>
    </View>
  );
};

export default PageTitleWithBackBtn;
