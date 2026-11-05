import { useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import RecipeDetail from "../../../components/RecipeDetail";
import { RecipeContext } from "../../../context/RecipeContext";
import { useThemeColors } from "../../../utils/theme";

export default function DetailScreen() {
  const { recipeId } = useLocalSearchParams();
  const { recipeList, deleteRecipe } = useContext(RecipeContext);
  const colors = useThemeColors();
  const recipe = recipeList.find((item) => item.id === Number(recipeId));

  const handleDelete = () => {
    Alert.alert(
      "레시피 삭제",
      `‘${recipe.title}’ 레시피를 삭제할까요?`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            router.back();
            deleteRecipe(recipe.id);
          },
        },
      ],
    );
  };

  if (!recipe) {
    return (
      <View
        style={[
          styles.missingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={{ color: colors.text }}>레시피를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <RecipeDetail recipe={recipe} />
      <View style={styles.actionRow}>
        <Pressable
          onPress={handleDelete}
          style={[styles.actionButton, styles.deleteButton]}
        >
          <Feather name="trash-2" size={20} color="white" />
          <Text style={styles.actionText}>삭제</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            router.navigate({
              pathname: "/add",
              params: { recipeId: recipe.id },
            })
          }
          style={[styles.actionButton, styles.editButton]}
        >
          <Feather name="edit-2" size={20} color="white" />
          <Text style={styles.actionText}>수정</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  missingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 24,
  },
  actionButton: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 18,
    borderRadius: 24,
  },
  deleteButton: { backgroundColor: "#D14343" },
  editButton: { backgroundColor: "#111" },
  actionText: { color: "white", fontSize: 15, fontWeight: "700" },
});
