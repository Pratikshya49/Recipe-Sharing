/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

// STEP 1: Create the Context (see Tutorial Week 2 - Context API)
const RecipeContext = createContext();

// Custom hook so components just call useRecipes() instead of
// importing useContext + RecipeContext everywhere.
export function useRecipes() {
  return useContext(RecipeContext);
}

export default RecipeContext;
