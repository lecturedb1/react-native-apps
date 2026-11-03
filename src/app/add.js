import { useContext, useState } from "react";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { RecipeContext } from "../../context/RecipeContext";

export default function AddScreen() {
  const { addRecipe } = useContext(RecipeContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSave = () => {
    if (!title.trim() || !category.trim() || !image.trim()) {
      Alert.alert("입력 확인", "필수 항목을 입력해주세요.");
      return;
    }

    addRecipe({
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      image: image.trim(),
    });
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="레시피 이름 *"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="카테고리 *"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="레시피 설명"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, styles.multiline]}
      />
      <TextInput
        placeholder="이미지 URL *"
        value={image}
        onChangeText={setImage}
        autoCapitalize="none"
        keyboardType="url"
        style={styles.input}
      />
      <Pressable onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>추가하기</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  input: {
    minHeight: 52,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    backgroundColor: "white",
  },
  multiline: { minHeight: 100, paddingTop: 14, textAlignVertical: "top" },
  button: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#111",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
