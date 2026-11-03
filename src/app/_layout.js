import { Stack } from "expo-router";

import { RecipeProvider } from "../../context/RecipeContext";

export default function RootLayout() {
  return (
    <RecipeProvider>
      <Stack>
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
