import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { createContext, useCallback, useEffect, useState } from "react";

import recipes from "../data/recipes";
import { deleteImage } from "../utils/imageStorage";
import FavoritesWidget from "../widgets/FavoritesWidget";

const RECIPE_KEY = "recipeList";
const FAVORITE_KEY = "favoriteIds";

export const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [recipeList, setRecipeList] = useState(recipes);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const savedRecipes = await AsyncStorage.getItem(RECIPE_KEY);
        const savedFavorites = await AsyncStorage.getItem(FAVORITE_KEY);

        if (savedRecipes) setRecipeList(JSON.parse(savedRecipes));
        if (savedFavorites) setFavoriteIds(JSON.parse(savedFavorites));
        setIsLoaded(true);
      } catch (error) {
        console.error("데이터를 불러오지 못했습니다.", error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    FavoritesWidget.updateSnapshot({
      count: favoriteIds.length,
    });
  }, [favoriteIds, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    async function saveData() {
      try {
        await AsyncStorage.setItem(RECIPE_KEY, JSON.stringify(recipeList));
        await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteIds));
      } catch (error) {
        console.error("데이터를 저장하지 못했습니다.", error);
      }
    }

    saveData();
  }, [recipeList, favoriteIds, isLoaded]);

  const addRecipe = useCallback((newRecipe) => {
    setRecipeList((current) => {
      const id = newRecipe.id ?? Crypto.randomUUID();
      if (current.some((recipe) => recipe.id === id)) return current;
      return [...current, { ...newRecipe, id }];
    });
  }, []);

  const updateRecipe = useCallback((id, updatedRecipe) => {
    setRecipeList((current) =>
      current.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe, id } : recipe,
      ),
    );
  }, []);

  const deleteRecipe = useCallback((id) => {
    const recipe = recipeList.find((item) => item.id === id);
    deleteImage(recipe?.image);
    setRecipeList((current) =>
      current.filter((recipe) => recipe.id !== id),
    );
    setFavoriteIds((current) =>
      current.filter((favoriteId) => favoriteId !== id),
    );
  }, [recipeList]);

  const deleteAllRecipes = useCallback(() => {
    recipeList.forEach((recipe) => deleteImage(recipe.image));
    setRecipeList([]);
    setFavoriteIds([]);
  }, [recipeList]);

  const toggleFavorite = (id) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  };

  return (
    <RecipeContext.Provider
      value={{
        recipeList,
        favoriteIds,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        deleteAllRecipes,
        toggleFavorite,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
