import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { getImageUri } from "../utils/imageStorage";
import { useThemeColors } from "../utils/theme";

export default function RecipeCard({
  recipe,
  isFavorite,
  onPress,
  onToggleFavorite,
}) {
  const colors = useThemeColors();
  const heartScale = useRef(new Animated.Value(1)).current;
  const cardScale = useRef(new Animated.Value(1)).current;

  const animateCard = (toValue) => {
    Animated.spring(cardScale, {
      toValue,
      speed: 30,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleToggleFavorite = () => {
    onToggleFavorite();
    Animated.sequence([
      Animated.spring(heartScale, {
        toValue: 1.2,
        speed: 30,
        bounciness: 6,
        useNativeDriver: true,
      }),
      Animated.spring(heartScale, {
        toValue: 1,
        speed: 50,
        bounciness: 0,
        overshootClamping: true,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        { backgroundColor: colors.card, transform: [{ scale: cardScale }] },
      ]}
    >
      <Pressable
        style={styles.content}
        onPress={onPress}
        onPressIn={() => animateCard(1.02)}
        onPressOut={() => animateCard(1)}
      >
        {recipe.image ? (
          <Image
            source={{ uri: getImageUri(recipe.image) }}
            style={styles.image}
          />
        ) : (
          <View style={[styles.image, { backgroundColor: colors.chip }]} />
        )}

        <View style={styles.info}>
          <Text style={[styles.category, { color: colors.secondaryText }]}>
            {recipe.category} · {recipe.cookingTime}분
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            {recipe.title}
          </Text>
          <Text
            numberOfLines={2}
            style={[styles.description, { color: colors.secondaryText }]}
          >
            {recipe.description}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={handleToggleFavorite}
        style={styles.favoriteButton}
      >
        <Animated.View style={{ transform: [{ scale: heartScale }] }}>
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={24}
            color={isFavorite ? "#E53935" : "#777"}
          />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 14,
    marginBottom: 14,
    padding: 12,
    alignItems: "center",
  },
  content: {
    flex: 1,
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
  favoriteButton: {
    padding: 8,
  },
});
