import { useContext, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { RecipeContext } from "../../../context/RecipeContext";
import sharedRecipes from "../../../data/sharedRecipes";
import { useThemeColors } from "../../../utils/theme";

export default function SharedScreen() {
  const colors = useThemeColors();
  const { recipeList, addRecipe } = useContext(RecipeContext);
  const [selectedId, setSelectedId] = useState(null);

  const handleDownload = (recipe) => {
    if (recipeList.some((item) => item.id === recipe.id)) {
      Alert.alert("저장된 레시피", "이미 앱에 저장된 레시피입니다.");
      return;
    }

    addRecipe({ ...recipe, isDownloaded: true });
    Alert.alert("저장 완료", "레시피를 앱에 저장했습니다.");
  };

  return (
    <FlatList
      data={sharedRecipes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isSaved = recipeList.some((recipe) => recipe.id === item.id);

        return (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Pressable
              onPress={() =>
                setSelectedId(selectedId === item.id ? null : item.id)
              }
              style={styles.summary}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text
                  style={[styles.category, { color: colors.secondaryText }]}
                >
                  {item.category} · {item.cookingTime}분
                </Text>
                <Text style={[styles.title, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[styles.description, { color: colors.secondaryText }]}
                >
                  {item.description}
                </Text>
              </View>
            </Pressable>
            {selectedId === item.id && (
              <View style={[styles.detail, { borderTopColor: colors.border }]}>
                <Text style={[styles.detailText, { color: colors.text }]}>
                  {item.generatedRecipe ?? "상세 레시피가 없습니다."}
                </Text>
                <Pressable
                  disabled={isSaved}
                  onPress={() => handleDownload(item)}
                  style={[styles.downloadButton, isSaved && styles.disabled]}
                >
                  <Text style={styles.downloadText}>
                    {isSaved ? "저장됨" : "앱에 저장"}
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        );
      }}
      ListEmptyComponent={
        <Text style={{ color: colors.text }}>공유된 레시피가 없습니다.</Text>
      }
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  card: {
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
  },
  summary: {
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
  detail: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  detailText: {
    lineHeight: 22,
  },
  downloadButton: {
    alignSelf: "flex-end",
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#2F855A",
  },
  downloadText: {
    color: "white",
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.5,
  },
});
