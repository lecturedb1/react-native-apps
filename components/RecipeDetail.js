import { Image, StyleSheet, Text, View } from "react-native";

import { getImageUri } from "../utils/imageStorage";
import { useThemeColors } from "../utils/theme";

export default function RecipeDetail({ recipe }) {
  const colors = useThemeColors();

  return (
    <>
      <Image source={{ uri: getImageUri(recipe.image) }} style={styles.image} />
      <Text style={[styles.category, { color: colors.secondaryText }]}>
        {recipe.category} · {recipe.cookingTime}분
      </Text>
      <Text style={[styles.title, { color: colors.text }]}>{recipe.title}</Text>
      <Text style={[styles.description, { color: colors.secondaryText }]}>
        {recipe.description}
      </Text>

      <View style={[styles.detailBox, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          레시피 소개
        </Text>
        <Text style={{ color: colors.text }}>
          이곳에 레시피 상세 내용이 표시됩니다.
        </Text>
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
    fontSize: 12,
    marginBottom: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  detailBox: {
    padding: 20,
    borderRadius: 14,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 14,
  },
});
