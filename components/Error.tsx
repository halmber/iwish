import { View } from "react-native";
import { Text } from "@/components/ui/";

interface ErrorProps {
  message: string;
  error?: string;
}

const Error: React.FC<ErrorProps> = ({ message, error }) => {
  return (
    <View className="flex-1 justify-center items-center bg-[#1e1f35]">
      <Text className="text-lg">{message}</Text>

      {error && <Text className="text-lg bg-red-500">{error}</Text>}
    </View>
  );
};

export default Error;
