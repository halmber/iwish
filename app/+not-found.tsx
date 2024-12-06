import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 bg-[#1e1f35] align-middle justify-center p-20">
        <Text>This screen doesn't exist.</Text>
        <Link href="/" className="mt-4 px-4">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
