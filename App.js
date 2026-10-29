import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const recipes = [
  {
    id: 1,
    title: "토마토 파스타",
    category: "양식 · 25분",
    description: "신선한 토마토로 만드는 간단한 파스타",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400",
  },
  {
    id: 2,
    title: "그린 샐러드",
    category: "샐러드 · 10분",
    description: "가볍고 건강하게 즐기는 한 끼",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
  },
  {
    id: 3,
    title: "마르게리타 피자",
    category: "양식 · 40분",
    description: "토마토와 치즈가 어우러진 피자",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
  },
  {
    id: 4,
    title: "브런치 팬케이크",
    category: "디저트 · 20분",
    description: "달콤한 아침을 위한 팬케이크",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400",
  },
  {
    id: 5,
    title: "수제 치즈버거",
    category: "양식 · 30분",
    description: "육즙 가득한 패티와 부드러운 치즈",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  },
  {
    id: 6,
    title: "건강한 포케 볼",
    category: "샐러드 · 15분",
    description: "신선한 채소와 다양한 토핑",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  },
  {
    id: 7,
    title: "치즈 케이크",
    category: "디저트 · 50분",
    description: "부드럽고 진한 치즈의 풍미",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400",
  },
  {
    id: 8,
    title: "아이스 라떼",
    category: "음료 · 5분",
    description: "시원하게 즐기는 홈카페 레시피",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
  },
];

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          key={selectedRecipe ? "detail" : "list"}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {selectedRecipe ? (
            <>
              <Pressable onPress={() => setSelectedRecipe(null)}>
                <Text style={styles.backButton}>← 레시피 목록</Text>
              </Pressable>

              <Image
                source={{ uri: selectedRecipe.image }}
                style={styles.detailImage}
              />

              <Text style={styles.recipeCategory}>
                {selectedRecipe.category}
              </Text>

              <Text style={styles.detailTitle}>{selectedRecipe.title}</Text>

              <Text style={styles.detailDescription}>
                {selectedRecipe.description}
              </Text>

              <View style={styles.detailBox}>
                <Text style={styles.sectionTitle}>레시피 소개</Text>
                <Text>이곳에 레시피 상세 내용이 표시됩니다.</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.headerTitle}>오늘의 레시피</Text>

              <TextInput
                placeholder="어떤 요리를 찾으세요?"
                style={styles.searchInput}
              />

              <Text style={styles.sectionTitle}>인기 레시피</Text>

              {recipes.map((recipe) => (
                <Pressable
                  key={recipe.id}
                  style={styles.recipeCard}
                  onPress={() => setSelectedRecipe(recipe)}
                >
                  <Image
                    source={{ uri: recipe.image }}
                    style={styles.recipeImage}
                  />

                  <View style={styles.recipeInfo}>
                    <Text style={styles.recipeCategory}>{recipe.category}</Text>

                    <Text style={styles.recipeTitle}>{recipe.title}</Text>

                    <Text numberOfLines={2} style={styles.recipeDescription}>
                      {recipe.description}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 24,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#333",
  },
  recipeCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 14,
    marginBottom: 14,
    padding: 12,
    alignItems: "center",
  },
  recipeImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 16,
  },
  recipeCategory: {
    color: "#777",
    fontSize: 12,
    marginBottom: 6,
  },
  recipeTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  recipeDescription: {
    color: "#666",
    fontSize: 13,
    lineHeight: 19,
  },
  backButton: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  detailImage: {
    width: "100%",
    height: 230,
    borderRadius: 14,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginTop: 8,
    marginBottom: 12,
  },
  detailDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  detailBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    marginTop: 24,
  },
});
