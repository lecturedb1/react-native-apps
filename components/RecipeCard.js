import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function RecipeCard({
  recipe,
  isFavorite,
  onPress,
  onToggleFavorite,
}) {
  return (
    <View style={styles.card}>
      <Pressable
        style={styles.content}
        onPress={onPress}
      >
        <Image source={{ uri: recipe.image }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.category}>{recipe.category}</Text>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text numberOfLines={2} style={styles.description}>
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
    backgroundColor: "white",
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
    color: "#777",
    fontSize: 12,
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  description: {
    color: "#666",
    fontSize: 13,
    lineHeight: 19,
  },
  favoriteButton: {
    padding: 8,
  },
});
