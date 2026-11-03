import { createContext, useCallback, useState } from "react";

import recipes from "../data/recipes";

export const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [recipeList, setRecipeList] = useState(recipes);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const addRecipe = useCallback((newRecipe) => {
    setRecipeList((current) => {
      const id = Math.max(...current.map((recipe) => recipe.id), 0) + 1;
      return [...current, { ...newRecipe, id }];
    });
  }, []);

  const toggleFavorite = (id) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  };

  return (
    <RecipeContext.Provider
      value={{ recipeList, favoriteIds, addRecipe, toggleFavorite }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
