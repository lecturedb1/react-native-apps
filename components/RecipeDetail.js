import { useContext, useEffect, useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { RecipeContext } from "../context/RecipeContext";
import { getImageUri } from "../utils/imageStorage";
import { useThemeColors } from "../utils/theme";

function createSampleRecipe(recipe) {
  return `공개 데모용 샘플 레시피입니다.

레시피: ${recipe.title}
카테고리: ${recipe.category}
조리 시간: ${recipe.cookingTime}분

재료
- ${recipe.title}용 주재료 300g
- 양파 1/2개
- 다진 마늘 1작은술
- 식용유 1큰술
- 소금과 후추 약간

조리 순서
1. 모든 재료를 먹기 좋은 크기로 손질합니다.
2. 팬을 중불로 달군 뒤 식용유와 다진 마늘을 넣어 볶습니다.
3. 준비한 재료를 넣고 골고루 익힙니다.
4. 소금과 후추로 간을 맞춘 뒤 그릇에 담습니다.

조리 팁
- 재료와 조리법은 기능 시연을 위한 예시이며 실제 요리에는 알맞게 조절하세요.`;
}

export default function RecipeDetail({ recipe }) {
  const colors = useThemeColors();
  const { updateRecipe } = useContext(RecipeContext);
  const imageAnimation = useRef(new Animated.Value(0)).current;
  const [recipeIntro, setRecipeIntro] = useState(
    recipe.generatedRecipe ?? "샘플 레시피를 확인할 수 있습니다.",
  );
  const [isSharing, setIsSharing] = useState(false);

  const handleCreateRecipe = () => {
    const generatedRecipe = createSampleRecipe(recipe);
    setRecipeIntro(generatedRecipe);
    updateRecipe(recipe.id, { generatedRecipe });
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      await new Promise((resolve) => setTimeout(resolve, 700));

      updateRecipe(recipe.id, { isShared: true });
      Alert.alert("공유 완료", "공개 데모용 공유 처리가 완료됐습니다.");
    } finally {
      setIsSharing(false);
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
      {recipe.image ? (
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
      ) : (
        <View style={[styles.image, { backgroundColor: colors.card }]} />
      )}
      <Pressable
        disabled={isSharing || recipe.isDownloaded}
        onPress={handleShare}
        style={[
          styles.shareButton,
          recipe.isDownloaded && { display: "none" },
          recipe.isShared && styles.sharedButton,
          isSharing && styles.disabledButton,
        ]}
      >
        {isSharing ? (
          <ActivityIndicator color="white" />
        ) : (
          <Feather
            name={recipe.isShared ? "check" : "share-2"}
            size={21}
            color="white"
          />
        )}
      </Pressable>
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
            disabled={recipe.isDownloaded}
            onPress={handleCreateRecipe}
            style={[
              styles.createButton,
              recipe.isDownloaded && { display: "none" },
            ]}
          >
            <Text style={styles.createButtonText}>레시피 생성</Text>
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
  shareButton: {
    position: "absolute",
    right: 28,
    top: 190,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "rgba(17, 17, 17, 0.8)",
  },
  sharedButton: {
    backgroundColor: "#2F855A",
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
