import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import RecipeDetail from "../../../components/RecipeDetail";
import recipes from "../../../data/recipes";

export default function DetailScreen() {
  const { recipeId } = useLocalSearchParams();
  const recipe = recipes.find((item) => item.id === Number(recipeId));

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <RecipeDetail recipe={recipe} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    padding: 16,
  },
});
