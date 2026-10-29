import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import recipes from "./data/recipes";

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          key={selectedRecipe ? "detail" : "list"}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {selectedRecipe ? (
            <RecipeDetail
              recipe={selectedRecipe}
              onBack={() => setSelectedRecipe(null)}
            />
          ) : (
            <>
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
                  onPress={() => setSelectedRecipe(recipe)}
                />
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
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
