/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

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

  // Week 4: replaced the setTimeout/mockRecipes mock with a real API call.
  // VITE_API_URL is read from Frontend/.env so the URL stays out of source code.
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await axios.get(`${API_URL}/api/recipes`)
        // Map _id → id so all existing components using recipe.id still work
        const data = response.data.map(r => ({ ...r, id: r._id }))
        setRecipes(data)
      } catch (error) {
        console.error("Failed to fetch recipes:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, []);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((rId) => rId !== id) : [...prev, id]
    );
  };

  const addRecipe = async (newRecipe) => {
    try {
      const response = await axios.post(`${API_URL}/api/recipes`, newRecipe)
      // Tag as isUserAdded in local state (until auth is added in Week 5)
      const created = { ...response.data.data, id: response.data.data._id, isUserAdded: true }
      setRecipes((prev) => [created, ...prev])
    } catch (error) {
      console.error("Failed to add recipe:", error)
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/recipes/${id}`)
      setRecipes((prev) => prev.filter((r) => r.id !== id))
      setBookmarks((prev) => prev.filter((rId) => rId !== id))
    } catch (error) {
      console.error("Failed to delete recipe:", error)
    }
  };

  const value = {
    recipes,
    loading,
    bookmarks,
    toggleBookmark,
    planner,
    setPlanner,
    addRecipe,
    deleteRecipe,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

export default RecipeContext;
