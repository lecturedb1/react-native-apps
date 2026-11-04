import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Appearance } from "react-native";
import { Stack } from "expo-router";

import { RecipeProvider } from "../../context/RecipeContext";
import { useThemeColors } from "../../utils/theme";

export default function RootLayout() {
  const colors = useThemeColors();

  useEffect(() => {
    AsyncStorage.getItem("themeMode")
      .then((savedTheme) => {
        const mode = ["light", "dark", "auto"].includes(savedTheme)
          ? savedTheme
          : "auto";
        Appearance.setColorScheme(mode);
      })
      .catch((error) => console.error("테마 복원 실패", error));
  }, []);

  return (
    <RecipeProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.navigation },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "List" }}
        />
        <Stack.Screen name="detail/[recipeId]" options={{ title: "Detail" }} />
        <Stack.Screen
          name="add"
          options={{ title: "레시피 추가", presentation: "modal" }}
        />
      </Stack>
    </RecipeProvider>
  );
}
