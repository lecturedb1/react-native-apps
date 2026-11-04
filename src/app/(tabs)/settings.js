import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Appearance, Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeColors } from "../../../utils/theme";

const options = [
  { label: "시스템 설정", value: "auto" },
  { label: "라이트 모드", value: "light" },
  { label: "다크 모드", value: "dark" },
];

export default function SettingsScreen() {
  const colors = useThemeColors();
  const [themeMode, setThemeMode] = useState("auto");

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem("themeMode");
        if (options.some((option) => option.value === savedTheme)) {
          setThemeMode(savedTheme);
        }
      } catch (error) {
        console.error("테마 설정 불러오기 실패", error);
      }
    }

    loadTheme();
  }, []);

  const changeTheme = async (mode) => {
    setThemeMode(mode);
    Appearance.setColorScheme(mode);

    try {
      await AsyncStorage.setItem("themeMode", mode);
    } catch (error) {
      console.error("테마 설정 저장 실패", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>화면 테마</Text>

      {options.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => changeTheme(option.value)}
          style={styles.option}
        >
          <Text style={[styles.optionText, { color: colors.text }]}>
            {themeMode === option.value ? "● " : "○ "}
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  option: { paddingVertical: 16 },
  optionText: { fontSize: 16 },
});
