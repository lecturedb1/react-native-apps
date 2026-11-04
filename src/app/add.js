import { useContext, useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { RecipeContext } from "../../context/RecipeContext";
import { getImageUri, saveImage } from "../../utils/imageStorage";
import { useThemeColors } from "../../utils/theme";

export default function AddScreen() {
  const { addRecipe } = useContext(RecipeContext);
  const colors = useThemeColors();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(await saveImage(result.assets[0].uri));
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("권한 필요", "사진 촬영을 위해 카메라 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(await saveImage(result.assets[0].uri));
    }
  };

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
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <TextInput
        placeholder="레시피 이름 *"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.secondaryText}
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
      />
      <TextInput
        placeholder="카테고리 *"
        value={category}
        onChangeText={setCategory}
        placeholderTextColor={colors.secondaryText}
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
      />
      <TextInput
        placeholder="레시피 설명"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor={colors.secondaryText}
        style={[
          styles.input,
          styles.multiline,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
      />
      <View style={styles.imageButtonRow}>
        <Pressable
          onPress={pickImage}
          style={[
            styles.imageButton,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={{ color: colors.text }}>갤러리에서 선택</Text>
        </Pressable>
        <Pressable
          onPress={takePhoto}
          style={[
            styles.imageButton,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={{ color: colors.text }}>사진 촬영</Text>
        </Pressable>
      </View>
      {image && (
        <Image source={{ uri: getImageUri(image) }} style={styles.image} />
      )}
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
    borderRadius: 10,
  },
  multiline: { minHeight: 100, paddingTop: 14, textAlignVertical: "top" },
  imageButtonRow: { flexDirection: "row", gap: 12 },
  imageButton: {
    flex: 1,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  image: { width: "100%", height: 240, borderRadius: 10 },
  button: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#111",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
