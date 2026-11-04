import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useThemeColors } from "../../../utils/theme";

export default function TabsLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.navigation },
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.navigation,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: colors.secondaryText,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "List",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
