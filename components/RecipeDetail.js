import { useContext, useEffect, useRef, useState } from "react";
import { fetch as expoFetch } from "expo/fetch";
import Feather from "@expo/vector-icons/Feather";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { RecipeContext } from "../context/RecipeContext";
import { createUploadFile, getImageUri } from "../utils/imageStorage";
import { useThemeColors } from "../utils/theme";

export default function RecipeDetail({ recipe }) {
  const colors = useThemeColors();
  const { updateRecipe } = useContext(RecipeContext);
  const imageAnimation = useRef(new Animated.Value(0)).current;
  const [recipeIntro, setRecipeIntro] = useState(
    recipe.generatedRecipe ?? "이곳에 레시피 상세 내용이 표시됩니다.",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleCreateRecipe = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://recipe-api-vert.vercel.app/api/recipe",
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
      const generatedRecipe = data.message ?? JSON.stringify(data);
      setRecipeIntro(generatedRecipe);
      updateRecipe(recipe.id, { generatedRecipe });
    } catch {
      setRecipeIntro("레시피를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!recipe.image) {
      Alert.alert("이미지 필요", "공유하려면 먼저 요리 이미지를 추가해주세요.");
      return;
    }

    try {
      setIsSharing(true);
      const imageUri = getImageUri(recipe.image);
      const formData = new FormData();
      formData.append("recipe", JSON.stringify(recipe));
      formData.append("image", await createUploadFile(imageUri));

      const response = await expoFetch(
        "https://recipe-api-vert.vercel.app/api/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
      }

      updateRecipe(recipe.id, { isShared: true });
      Alert.alert("공유 완료", "레시피가 클라우드에 업로드됐습니다.");
    } catch (error) {
      Alert.alert("공유 실패", error.message);
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
            disabled={isLoading || recipe.isDownloaded}
            onPress={handleCreateRecipe}
            style={[
              styles.createButton,
              recipe.isDownloaded && { display: "none" },
              isLoading && styles.disabledButton,
            ]}
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
