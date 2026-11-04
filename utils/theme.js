import { useColorScheme } from "react-native";

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

export function useThemeColors() {
  return themeColors[useColorScheme() === "dark" ? "dark" : "light"];
}
