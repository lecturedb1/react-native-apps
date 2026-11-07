import { useContext, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Host, Picker } from "@expo/ui";
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

const categories = [
  "양식",
  "샐러드",
  "디저트",
  "음료",
  "한식",
  "중식",
  "일식",
  "기타",
];
const cookingTimes = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

export default function AddScreen() {
  const { recipeList, addRecipe, updateRecipe } = useContext(RecipeContext);
  const { recipeId } = useLocalSearchParams();
  const id = Number(recipeId);
  const recipe = recipeList.find((item) => item.id === id);
  const isEditing = Boolean(recipe);
  const colors = useThemeColors();
  const [title, setTitle] = useState(recipe?.title ?? "");
  const [category, setCategory] = useState(recipe?.category ?? categories[0]);
  const [cookingTime, setCookingTime] = useState(
    recipe?.cookingTime ?? cookingTimes[0],
  );
  const [description, setDescription] = useState(recipe?.description ?? "");
  const [image, setImage] = useState(recipe?.image ?? "");

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
    if (!title.trim() || !image.trim()) {
      Alert.alert("입력 확인", "필수 항목을 입력해주세요.");
      return;
    }

    const recipeData = {
      title: title.trim(),
      category: category.trim(),
      cookingTime,
      description: description.trim(),
      image: image.trim(),
    };

    if (isEditing) {
      updateRecipe(id, recipeData);
    } else {
      addRecipe(recipeData);
    }
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{ title: isEditing ? "레시피 수정" : "레시피 추가" }}
      />
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
        <View style={styles.pickerRow}>
          <View
            style={[
              styles.input,
              styles.pickerContainer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={{ fontSize: 12, color: colors.secondaryText }}>
              카테고리
            </Text>
            <Host matchContents={{ vertical: true }} style={styles.pickerHost}>
              <Picker selectedValue={category} onValueChange={setCategory}>
                {categories.map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
                ))}
              </Picker>
            </Host>
          </View>
          <View
            style={[
              styles.input,
              styles.pickerContainer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={{ fontSize: 12, color: colors.secondaryText }}>
              조리시간
            </Text>
            <Host matchContents={{ vertical: true }} style={styles.pickerHost}>
              <Picker
                selectedValue={cookingTime}
                onValueChange={setCookingTime}
              >
                {cookingTimes.map((minutes) => (
                  <Picker.Item
                    key={minutes}
                    label={`${minutes}분`}
                    value={minutes}
                  />
                ))}
              </Picker>
            </Host>
          </View>
        </View>
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
          <Text style={styles.buttonText}>
            {isEditing ? "수정 완료" : "추가하기"}
          </Text>
        </Pressable>
      </ScrollView>
    </>
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
  pickerRow: { flexDirection: "row", gap: 12 },
  pickerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 0,
  },
  pickerHost: {
    width: 100,
    marginRight: -8,
    transform: [{ scale: 0.85 }],
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
