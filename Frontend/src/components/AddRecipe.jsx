import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useRecipes } from "../context/RecipeContext";

function AddRecipe() {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  // Core fields
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [image, setImage] = useState("");

  // Dynamic arrays and their current input state
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState("");

  const [error, setError] = useState("");

  // Add an ingredient to the list
  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (!currentIngredient.trim()) return;

    // Prevent duplicate entries for clarity
    if (ingredients.includes(currentIngredient.trim())) {
      setError("This ingredient is already in the list!");
      return;
    }

    setIngredients([...ingredients, currentIngredient.trim()]);
    setCurrentIngredient("");
    setError("");
  };

  // Remove an ingredient from the list
  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, idx) => idx !== indexToRemove));
  };

  // Add a step to the instructions list
  const handleAddStep = (e) => {
    e.preventDefault();
    if (!currentStep.trim()) return;

    setSteps([...steps, currentStep.trim()]);
    setCurrentStep("");
    setError("");
  };

  // Remove a step from the list
  const handleRemoveStep = (indexToRemove) => {
    setSteps(steps.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please specify a recipe title.");
      return;
    }
    if (!cuisine.trim()) {
      setError("Please specify the cuisine type (e.g. Italian, Indian).");
      return;
    }
    if (!cookTime || Number(cookTime) <= 0) {
      setError("Please enter a valid cook time in minutes.");
      return;
    }
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }
    if (steps.length === 0) {
      setError("Please add at least one instruction step.");
      return;
    }

    addRecipe({
      title: title.trim(),
      cuisine: cuisine.trim(),
      cookTime: Number(cookTime),
      difficulty,
      image: image.trim() || undefined, // undefined falls back to placeholder
      ingredients,
      steps,
    });

    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white rounded-3xl border border-orange-100/60 shadow-sm p-6 md:p-8 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Share Your Recipe</h2>
        <p className="text-gray-500 text-sm mt-1">Let the community know how to make your favourite dish.</p>
      </div>

      {error && (
        <div className="text-sm bg-rose-50 text-rose-700 border border-rose-100 rounded-xl px-4 py-3 font-medium flex items-center gap-2">
          {/* ⚠️ Professional warning icon — universally recognized error/validation indicator */}
          <span aria-hidden="true">⚠️</span> {error}
        </div>
      )}

      {/* Grid for Name & Cuisine */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recipe Title</label>
          <input
            type="text"
            placeholder="e.g. Garlic Butter Shrimp"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cuisine Type</label>
          <input
            type="text"
            placeholder="e.g. Seafood, Italian, Asian"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full px-4 py-3 border border-gray-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition"
          />
        </div>
      </div>

      {/* Grid for Cook Time, Difficulty & Optional Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cook Time (Minutes)</label>
          <input
            type="number"
            placeholder="e.g. 25"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-4 py-3 border border-gray-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm bg-white cursor-pointer transition"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Image URL (Optional)</label>
        <input
          type="url"
          placeholder="e.g. https://images.unsplash.com/... (leaves blank for placeholder)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-4 py-3 border border-gray-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition"
        />
      </div>

      {/* Dynamic Ingredients List */}
      <div className="border-t border-gray-100 pt-5">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ingredients List</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="e.g. 2 tbsp Olive Oil"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient(e)}
            className="flex-1 px-4 py-3 border border-gray-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="px-5 bg-orange-50 text-orange-700 hover:bg-orange-100 font-semibold rounded-xl text-sm border border-orange-200 transition cursor-pointer"
          >
            + Add
          </button>
        </div>

        {ingredients.length > 0 ? (
          <ul className="flex flex-wrap gap-2 mt-2 bg-orange-50/20 p-3 rounded-2xl border border-orange-50/50">
            {ingredients.map((ing, index) => (
              <li
                key={index}
                className="flex items-center gap-2 bg-white text-gray-700 border border-orange-100/60 px-3 py-1.5 rounded-full text-xs font-medium shadow-xs"
              >
                <span>{ing}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-gray-400 hover:text-rose-600 transition font-bold cursor-pointer text-[10px]"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-400 italic">No ingredients added yet.</p>
        )}
      </div>

      {/* Dynamic Steps List */}
      <div className="border-t border-gray-100 pt-5">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Preparation Steps</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="e.g. Preheat oven to 200°C..."
            value={currentStep}
            onChange={(e) => setCurrentStep(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddStep(e)}
            className="flex-1 px-4 py-3 border border-gray-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition"
          />
          <button
            type="button"
            onClick={handleAddStep}
            className="px-5 bg-orange-50 text-orange-700 hover:bg-orange-100 font-semibold rounded-xl text-sm border border-orange-200 transition cursor-pointer"
          >
            + Add
          </button>
        </div>

        {steps.length > 0 ? (
          <ol className="space-y-2 mt-2 bg-orange-50/20 p-4 rounded-2xl border border-orange-50/50">
            {steps.map((step, index) => (
              <li
                key={index}
                className="flex items-start justify-between gap-3 bg-white border border-orange-100/60 p-3 rounded-xl shadow-xs"
              >
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 text-xs leading-normal">{step}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  className="text-gray-400 hover:text-rose-600 transition font-bold cursor-pointer text-xs mt-0.5"
                >
                  ✕
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-xs text-gray-400 italic">No steps added yet.</p>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-gray-100 pt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm transition cursor-pointer"
        >
          Cancel
        </button>
        <Button text="Add Recipe" type="submit" variant="primary" />
      </div>
    </form>
  );
}

export default AddRecipe;
