import { router } from "expo-router";
import { FlatList, StyleSheet, Text, TextInput } from "react-native";

import RecipeCard from "../../../components/RecipeCard";
import recipes from "../../../data/recipes";

export default function ListScreen() {
  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <RecipeCard
          recipe={item}
          onPress={() =>
            router.navigate({
              pathname: "/detail/[recipeId]",
              params: { recipeId: item.id },
            })
          }
        />
      )}
      ListHeaderComponent={
        <>
          <Text style={styles.headerTitle}>오늘의 레시피</Text>

          <TextInput
            placeholder="어떤 요리를 찾으세요?"
            style={styles.searchInput}
          />

          <Text style={styles.sectionTitle}>인기 레시피</Text>
        </>
      }
      style={styles.list}
      contentContainerStyle={styles.scrollContent}
    />
  );
}

const styles = StyleSheet.create({
  list: {
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
