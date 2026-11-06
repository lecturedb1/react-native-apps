import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { getImageUri } from "../utils/imageStorage";
import { useThemeColors } from "../utils/theme";

export default function RecipeDetail({ recipe }) {
  const colors = useThemeColors();
  const imageAnimation = useRef(new Animated.Value(0)).current;

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
