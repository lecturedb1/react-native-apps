import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance, Platform, useColorScheme } from "react-native";

export const themeColors = {
  light: {
    background: "#F8F9FA",
    navigation: "#FFFFFF",
    card: "#FFFFFF",
    text: "#222222",
    secondaryText: "#666666",
    border: "#D1D5DB",
    chip: "#E9ECEF",
  },
  dark: {
    background: "#0F0F0F",
    navigation: "#2C2C2E",
    card: "#242424",
    text: "#F5F5F5",
    secondaryText: "#B0B0B0",
    border: "#525252",
    chip: "#333333",
  },
};

const ThemeContext = createContext(null);
const themeModes = ["light", "dark", "auto"];

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState("auto");
  const resolvedTheme =
    themeMode === "auto" ? systemColorScheme ?? "light" : themeMode;
  const colors = themeColors[resolvedTheme];

  useEffect(() => {
    AsyncStorage.getItem("themeMode")
      .then((savedTheme) => {
        if (!themeModes.includes(savedTheme)) return;

        setThemeModeState(savedTheme);
        if (Platform.OS !== "web") {
          Appearance.setColorScheme(savedTheme);
        }
      })
      .catch((error) => console.error("테마 복원 실패", error));
  }, []);

  const setThemeMode = async (mode) => {
    if (!themeModes.includes(mode)) return;

    setThemeModeState(mode);
    if (Platform.OS !== "web") {
      Appearance.setColorScheme(mode);
    }

    try {
      await AsyncStorage.setItem("themeMode", mode);
    } catch (error) {
      console.error("테마 설정 저장 실패", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ colors, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return theme;
}

export function useThemeColors() {
  return useTheme().colors;
}
