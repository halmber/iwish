import { View, ActivityIndicator } from "react-native";
import { Text } from "@/components/ui/";

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <View className="flex-1 justify-center items-center bg-[#1e1f35]">
      <ActivityIndicator size="large" color="#ff6347" />
      <Text className="mt-4">{message}</Text>
    </View>
  );
};

export default Loading;
