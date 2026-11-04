import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { getImageUri } from "../utils/imageStorage";
import { useThemeColors } from "../utils/theme";

export default function RecipeCard({
  recipe,
  isFavorite,
  onPress,
  onToggleFavorite,
}) {
  const colors = useThemeColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Pressable
        style={styles.content}
        onPress={onPress}
      >
        <Image source={{ uri: getImageUri(recipe.image) }} style={styles.image} />

        <View style={styles.info}>
          <Text style={[styles.category, { color: colors.secondaryText }]}>
            {recipe.category}
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            {recipe.title}
          </Text>
          <Text
            numberOfLines={2}
            style={[styles.description, { color: colors.secondaryText }]}
          >
            {recipe.description}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleFavorite}
        style={styles.favoriteButton}
      >
        <FontAwesome
          name={isFavorite ? "heart" : "heart-o"}
          size={24}
          color={isFavorite ? "#E53935" : "#777"}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 14,
    marginBottom: 14,
    padding: 12,
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  category: {
    fontSize: 12,
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
  },
  favoriteButton: {
    padding: 8,
  },
});
