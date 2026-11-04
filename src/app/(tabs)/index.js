import { useContext, useMemo, useState } from "react";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import RecipeCard from "../../../components/RecipeCard";
import { RecipeContext } from "../../../context/RecipeContext";
import { useThemeColors } from "../../../utils/theme";

const getCategory = (recipe) => recipe.category.split(" · ")[0];

export default function ListScreen() {
  const { recipeList, favoriteIds, toggleFavorite } = useContext(RecipeContext);
  const colors = useThemeColors();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const categories = useMemo(
    () => ["전체", ...new Set(recipeList.map(getCategory))],
    [recipeList],
  );

  const filteredRecipes = recipeList.filter((recipe) => {
    const matchesQuery = recipe.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || getCategory(recipe) === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            isFavorite={favoriteIds.includes(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
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
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              오늘의 레시피
            </Text>

            <TextInput
              placeholder="어떤 요리를 찾으세요?"
              value={query}
              onChangeText={setQuery}
              placeholderTextColor={colors.secondaryText}
              style={[
                styles.searchInput,
                { backgroundColor: colors.card, color: colors.text },
              ]}
            />

            <View style={styles.categoryList}>
              {categories.map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryButton,
                    { backgroundColor: colors.chip },
                    selectedCategory === category &&
                      styles.selectedCategoryButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      { color: colors.text },
                      selectedCategory === category &&
                        styles.selectedCategoryButtonText,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              인기 레시피
            </Text>
          </>
        }
        ListEmptyComponent={
          <Text style={{ color: colors.text }}>검색 결과가 없습니다.</Text>
        }
        style={[styles.list, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
      />

      <Pressable
        onPress={() => router.navigate("/add")}
        style={styles.addButton}
      >
        <Feather name="plus" size={30} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 96,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchInput: {
    padding: 15,
    borderRadius: 12,
    fontSize: 15,
  },
  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
    marginBottom: 24,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  selectedCategoryButton: {
    backgroundColor: "#333",
  },
  categoryButtonText: {
    fontWeight: "600",
  },
  selectedCategoryButtonText: {
    color: "white",
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 14,
  },
  addButton: {
    position: "absolute",
    right: 22,
    bottom: 22,
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(17, 17, 17, 0.75)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 6,
  },
});
