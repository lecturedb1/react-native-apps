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
      </Stack>
    </RecipeProvider>
  );
}
