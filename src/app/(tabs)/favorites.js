import { useContext } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import { RecipeContext } from "../../../context/RecipeContext";

export default function FavoritesScreen() {
  const { recipeList } = useContext(RecipeContext);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <Text>{JSON.stringify(recipeList, null, 2)}</Text>
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
