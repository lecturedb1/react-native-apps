import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import {
  Appearance,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";

import { RecipeProvider } from "../../context/RecipeContext";
import { useThemeColors } from "../../utils/theme";

if (Platform.OS !== "web") {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export default function RootLayout() {
  const colors = useThemeColors();
  const { width, height } = useWindowDimensions();
  const showPhoneFrame = Platform.OS === "web" && width >= 768;

  useEffect(() => {
    if (Platform.OS === "web") return;

    AsyncStorage.getItem("themeMode")
      .then((savedTheme) => {
        const mode = ["light", "dark", "auto"].includes(savedTheme)
          ? savedTheme
          : "auto";
        Appearance.setColorScheme(mode);
      })
      .catch((error) => console.error("테마 복원 실패", error));
  }, []);

  const app = (
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

  if (!showPhoneFrame) {
    return app;
  }

  return (
    <View style={styles.webBackground}>
      <View
        style={[
          styles.phoneFrame,
          {
            height: Math.max(height - 32, 0),
            backgroundColor: colors.background,
          },
        ]}
      >
        {app}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#dfe3e8",
  },
  phoneFrame: {
    width: "100%",
    maxWidth: 430,
    maxHeight: 900,
    overflow: "hidden",
    borderWidth: 8,
    borderColor: "#171717",
    borderRadius: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },
});
