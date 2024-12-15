import { View } from "react-native";
import { Text } from "@/components/ui/";

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <View className="flex flex-row justify-between items-center border-b border-gray-600 mb-3">
      <Text className="text-lg text-gray-400 font-semibold">{label}</Text>
      <Text className="text-lg">{value}</Text>
    </View>
  );
};

export default InfoRow;
