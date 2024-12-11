import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: "#ff6347",
        headerShown: false,
        tabBarActiveBackgroundColor: "#2c2f3e",
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#1e1f35",
        },
      }}
    >
      <Tabs.Screen
        name="myWishLists"
        options={{
          title: "My Wishlists",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="gifts" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addWish"
        options={{
          title: "Add Wish",
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
