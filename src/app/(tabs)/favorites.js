import { useContext } from "react";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import RecipeCard from "../../../components/RecipeCard";
import { RecipeContext } from "../../../context/RecipeContext";
import { useThemeColors } from "../../../utils/theme";

export default function FavoritesScreen() {
  const { recipeList, favoriteIds, toggleFavorite } =
    useContext(RecipeContext);
  const colors = useThemeColors();
  const favorites = recipeList.filter((recipe) =>
    favoriteIds.includes(recipe.id),
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            isFavorite
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
          <Text style={[styles.title, { color: colors.text }]}>즐겨찾기</Text>
        }
        ListEmptyComponent={
          <Text style={{ color: colors.secondaryText }}>
            즐겨찾기한 레시피가 없습니다.
          </Text>
        }
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
