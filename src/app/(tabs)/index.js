import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";

import RecipeCard from "../../../components/RecipeCard";
import recipes from "../../../data/recipes";

export default function ListScreen() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.headerTitle}>오늘의 레시피</Text>

      <TextInput
        placeholder="어떤 요리를 찾으세요?"
        style={styles.searchInput}
      />

      <Text style={styles.sectionTitle}>인기 레시피</Text>

      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onPress={() =>
            router.navigate({
              pathname: "/detail/[recipeId]",
              params: { recipeId: recipe.id },
            })
          }
        />
      ))}
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
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 24,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#333",
  },
});
