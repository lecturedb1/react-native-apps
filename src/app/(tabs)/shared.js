import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useThemeColors } from "../../../utils/theme";

export default function SharedScreen() {
  const colors = useThemeColors();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://recipe-api-vert.vercel.app/api/recipes")
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => setRecipes(data))
      .catch(() => setError("공유 레시피를 불러오지 못했습니다."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={[styles.category, { color: colors.secondaryText }]}>
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
        </View>
      )}
      ListEmptyComponent={
        <Text style={{ color: colors.text }}>공유된 레시피가 없습니다.</Text>
      }
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
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
});
