import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetail from "./pages/RecipeDetail";
import MyRecipes from "./pages/MyRecipes";
import RecipeContext from "./context/RecipeContext";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from "./api/recipeApi"; 
import { getBookmarks, toggleBookmark as toggleBookmarkApi } from "./api/authApi"; 
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

export default function App() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [planner, setPlanner] = useState({
    Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {}, Sat: {}, Sun: {},
  });

  const availableRecipes = useMemo(() => recipes.length, [recipes]);

  useEffect(() => {
    document.title = `RecipeHub | ${availableRecipes} recipes available`;
  }, [availableRecipes]);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const response = await getRecipes();
        const data = response.data.map(r => ({ ...r, id: r._id || r.id }));
        setRecipes(data);
      } catch (err) {
        setErrors((prev) => [...prev, err]);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    }
    loadRecipes();
  }, []);

  async function handleAddRecipe(newRecipe) {
    try {
      const response = await addRecipe({ ...newRecipe, createdBy: user?._id });
      const created = { ...response.data.data, id: response.data.data._id, isUserAdded: true };
      setRecipes((prev) => [created, ...prev]);
    } catch (err) {
      console.error("Failed to add recipe:", err);
      if (err.response?.data) {
        console.error("Backend validation errors:", err.response.data);
      }
    }
  }

  async function handleDeleteRecipe(id) {
    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      setBookmarks((prev) => prev.filter((rId) => rId !== id));
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  }

  async function handleUpdateRecipe(id, updatedRecipe) {
    try {
      const response = await updateRecipe(id, updatedRecipe);
      const updated = { ...response.data.data, id: response.data.data._id };
      setRecipes((prev) =>
        prev.map((r) => (String(r.id) === String(id) ? updated : r))
      );
    } catch (err) {
      console.error("Failed to update recipe:", err);
    }
  }

  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      setBookmarks([]);
      return;
    }
    let active = true;
    getBookmarks()
      .then((res) => {
        if (active) setBookmarks(res.data?.data || []);
      })
      .catch((err) => {
        console.error("Failed to load bookmarks:", err);
        if (active) setBookmarks([]);
      });
    return () => {
      active = false;
    };
  }, [userId]);

  function toggleBookmark(id) {
    if (!userId) {
      setBookmarks((prev) =>
        prev.includes(id) ? prev.filter((rId) => rId !== id) : [...prev, id]
      );
      return;
    }
    toggleBookmarkApi(id)
      .then((res) => setBookmarks(res.data?.data || []))
      .catch((err) => console.error("Failed to toggle bookmark:", err));
  }

  const value = {
    recipes,
    loading,
    isLoading,
    error: errors,
    errors,
    bookmarks,
    toggleBookmark,
    planner,
    setPlanner,
    addRecipe: handleAddRecipe,
    deleteRecipe: handleDeleteRecipe,
    updateRecipe: handleUpdateRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>
      {errors.length > 0 && (
        <div className="bg-rose-50 text-rose-700 border-b border-rose-100 px-4 py-3 text-center text-sm font-medium">
          {errors.map((err, index) => (
            <p key={index}>{err.message || String(err)}</p>
          ))}
        </div>
      )}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/my-recipes"
            element={
              <ProtectedRoute>
                <MyRecipes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddRecipePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <ProtectedRoute>
                <RecipeDetail />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </RecipeContext.Provider>
  );
}