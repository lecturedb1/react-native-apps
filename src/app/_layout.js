import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "List" }} />
      <Stack.Screen name="detail/[recipeId]" options={{ title: "Detail" }} />
    </Stack>
  );
}
