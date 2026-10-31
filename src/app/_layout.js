import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "List" }}
      />
      <Stack.Screen name="detail/[recipeId]" options={{ title: "Detail" }} />
    </Stack>
  );
}
