import { createContext, useState } from "react";

import recipes from "../data/recipes";

export const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [recipeList, setRecipeList] = useState(recipes);

  return (
    <RecipeContext.Provider value={{ recipeList, setRecipeList }}>
      {children}
    </RecipeContext.Provider>
  );
}
