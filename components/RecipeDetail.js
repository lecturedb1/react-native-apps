import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { getImageUri } from "../utils/imageStorage";
import { useThemeColors } from "../utils/theme";

export default function RecipeDetail({ recipe }) {
  const colors = useThemeColors();
  const imageAnimation = useRef(new Animated.Value(0)).current;
  const [recipeIntro, setRecipeIntro] = useState(
    "이곳에 레시피 상세 내용이 표시됩니다.",
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRecipe = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://recipe-api-vert.vercel.app/api/hello",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: recipe.title,
            category: recipe.category,
            cookingTime: recipe.cookingTime,
            description: recipe.description,
          }),
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setRecipeIntro(data.message ?? JSON.stringify(data));
    } catch {
      setRecipeIntro("레시피를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    imageAnimation.setValue(0);
    Animated.timing(imageAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [imageAnimation, recipe.id]);

  return (
    <>
      <Animated.Image
        source={{ uri: getImageUri(recipe.image) }}
        style={[
          styles.image,
          {
            opacity: imageAnimation,
            transform: [
              {
                translateY: imageAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
              {
                scale: imageAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              },
            ],
          },
        ]}
      />
      <Text style={[styles.category, { color: colors.secondaryText }]}>
        {recipe.category} · {recipe.cookingTime}분
      </Text>
      <Text style={[styles.title, { color: colors.text }]}>{recipe.title}</Text>
      <Text style={[styles.description, { color: colors.secondaryText }]}>
        {recipe.description}
      </Text>

      <View style={[styles.detailBox, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            레시피 소개
          </Text>
          <Pressable
            disabled={isLoading}
            onPress={handleCreateRecipe}
            style={[styles.createButton, isLoading && styles.disabledButton]}
          >
            <Text style={styles.createButtonText}>
              {isLoading ? "생성 중..." : "레시피 생성"}
            </Text>
          </Pressable>
        </View>
        <Text style={{ color: colors.text }}>{recipeIntro}</Text>
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#3182CE",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
  },
  disabledButton: { opacity: 0.6 },
  createButtonText: { color: "white", fontWeight: "700" },
});
