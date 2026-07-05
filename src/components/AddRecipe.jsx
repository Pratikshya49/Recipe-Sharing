import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useRecipes } from "../context/RecipeContext";

// AddRecipe is a Controlled Component (Week 2 - Forms):
// React state (name/ingredients/instructions) dictates each input's
// value, and typing updates that state via onChange.
function AddRecipe() {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Dinner");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser reloading the page

    if (!title.trim() || !ingredientsText.trim() || !instructions.trim()) {
      setError("Please fill in the recipe name, ingredients and instructions.");
      return;
    }

    addRecipe({
      title: title.trim(),
      category,
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600",
      ingredients: ingredientsText.split(",").map((i) => i.trim()).filter(Boolean),
      instructions: instructions.trim(),
    });

    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white rounded-xl border border-orange-100 shadow-sm p-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-900">Share a new recipe</h2>

      {error && (
        <p className="text-sm bg-rose-50 text-rose-700 border border-rose-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
        <input
          type="text"
          placeholder="e.g. Spaghetti Carbonara"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg"
        >
          {["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ingredients (comma separated)
        </label>
        <textarea
          placeholder="e.g. Spaghetti, Eggs, Parmesan, Bacon"
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cooking instructions</label>
        <textarea
          placeholder="Step-by-step instructions..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <Button text="Add Recipe" type="submit" variant="primary" />
    </form>
  );
}

export default AddRecipe;
