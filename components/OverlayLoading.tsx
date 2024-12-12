import { View, ActivityIndicator } from "react-native";
import { Text } from "@/components/ui/";

interface OverlayLoadingProps {
  message: string;
}

const OverlayLoading: React.FC<OverlayLoadingProps> = ({ message }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <ActivityIndicator size="large" color="#ff6347" />
      <Text className="text-2xl font-bold text-center mt-4">{message}</Text>
    </View>
  );
};

export default OverlayLoading;
