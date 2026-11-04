import { useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import RecipeDetail from "../../../components/RecipeDetail";
import { RecipeContext } from "../../../context/RecipeContext";
import { useThemeColors } from "../../../utils/theme";

export default function DetailScreen() {
  const { recipeId } = useLocalSearchParams();
  const { recipeList } = useContext(RecipeContext);
  const colors = useThemeColors();
  const recipe = recipeList.find((item) => item.id === Number(recipeId));

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <RecipeDetail recipe={recipe} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});
