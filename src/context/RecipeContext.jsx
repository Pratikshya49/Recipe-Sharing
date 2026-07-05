/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import mockRecipes from "../data/recipes";

// STEP 1: Create the Context (see Tutorial Week 2 - Context API)
const RecipeContext = createContext();

// Custom hook so components just call useRecipes() instead of
// importing useContext + RecipeContext everywhere.
export function useRecipes() {
  return useContext(RecipeContext);
}

// STEP 2: Provide the context. Wrapping <App /> with this Provider
// means ANY component in the tree (RecipeCard, AddRecipe, RecipeDetail...)
// can read/update recipes & bookmarks directly, without the data being
// drilled down through every layer of intermediate components.
export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [planner, setPlanner] = useState({
    Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {}, Sat: {}, Sun: {},
  });

  // useEffect for a side effect: simulate loading recipes from an API
  // (a real backend call will replace this in the Node/Express weeks).
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecipes(mockRecipes);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((rId) => rId !== id) : [...prev, id]
    );
  };

  const addRecipe = (newRecipe) => {
    setRecipes((prev) => [
      { id: Date.now(), category: "Dinner", difficulty: "Easy", prepTime: 0, cookTime: 0, ...newRecipe },
      ...prev,
    ]);
  };

  const value = {
    recipes,
    loading,
    bookmarks,
    toggleBookmark,
    planner,
    setPlanner,
    addRecipe,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

export default RecipeContext;
