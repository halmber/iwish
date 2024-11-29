import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-[#1e1f35]">
      <Text className="text-white">
        Edit app/index.tsx to edit this screen. See firebase project id:{" "}
        {process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID}
      </Text>
    </View>
  );
}
