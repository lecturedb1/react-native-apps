import { createContext, useCallback, useState } from "react";

import recipes from "../data/recipes";

export const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [recipeList, setRecipeList] = useState(recipes);

  const addRecipe = useCallback((newRecipe) => {
    setRecipeList((current) => {
      const id = Math.max(...current.map((recipe) => recipe.id), 0) + 1;
      return [...current, { ...newRecipe, id }];
    });
  }, []);

  return (
    <RecipeContext.Provider value={{ recipeList, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}
