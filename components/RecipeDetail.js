import { Image, StyleSheet, Text, View } from "react-native";

import { getImageUri } from "../utils/imageStorage";

export default function RecipeDetail({ recipe }) {
  return (
    <>
      <Image source={{ uri: getImageUri(recipe.image) }} style={styles.image} />
      <Text style={styles.category}>{recipe.category}</Text>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description}>{recipe.description}</Text>

      <View style={styles.detailBox}>
        <Text style={styles.sectionTitle}>레시피 소개</Text>
        <Text>이곳에 레시피 상세 내용이 표시됩니다.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 230,
    borderRadius: 14,
    marginBottom: 20,
  },
  category: {
    color: "#777",
    fontSize: 12,
    marginBottom: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginTop: 8,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  detailBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#333",
  },
});
