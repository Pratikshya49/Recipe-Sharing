import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { getAIRecipeRecommendation } from '../api/aiApi';

export default function WhatCanICook({ onClose }) {
  const { addRecipe } = useContext(RecipeContext);
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState('');
  const [budget, setBudget] = useState(500);
  const [familyMembers, setFamilyMembers] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecipe(null);
    setSaved(false);

    try {
      const result = await getAIRecipeRecommendation({
        ingredients,
        budget: Number(budget),
        familyMembers: Number(familyMembers),
      });
      setRecipe(result);
    } catch (err) {
      if (err.response?.status === 429) {
        setError('API rate limit reached. Please wait a moment and try again.');
      } else if (err.code === 'ERR_NETWORK' || !err.response) {
        setError('Network Error: Could not connect to the Backend Server at port 3001. Please verify the backend server is running.');
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to generate recipe. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToRecipes = async () => {
    if (!recipe) return;
    const title = recipe.title || 'AI Recommended Recipe';
    const keywords = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().split(/\s+/).slice(0, 3).join(',');
    const fallbackImage = `https://loremflickr.com/800/600/${keywords}`;
    try {
      await addRecipe({
        title,
        cuisine: recipe.cuisine || 'Fusion',
        cookTime: Number(recipe.cookTime) || 30,
        difficulty: recipe.difficulty || 'Easy',
        image: recipe.image || fallbackImage,
        category: 'Dinner',
        ingredients: recipe.ingredients || [],
        steps: recipe.steps || [],
      });
      setSaved(true);
    } catch (err) {
      console.error('Failed to save AI recipe:', err);
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white shadow-lg border-b border-orange-500/30 py-6 px-4 sm:px-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🍳</span>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                What Can I Cook? <span className="text-xs bg-white/20 text-orange-100 px-2 py-0.5 rounded-full font-medium">Gemini AI 🇳🇵</span>
              </h2>
              <p className="text-xs text-orange-100">Get personalized Nepali & global recipe recommendations based on budget (रु), family size, and available ingredients.</p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
              title="Close AI Bar"
            >
              ✕
            </button>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-inner">
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-orange-100 mb-1">
              💳 Budget (NPR / रु)
            </label>
            <input
              type="number"
              min="10"
              max="50000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-white text-gray-900 px-3 py-2 text-sm rounded-lg border-0 focus:ring-2 focus:ring-amber-300 font-medium outline-none"
              placeholder="e.g. 500"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-orange-100 mb-1">
              👨‍👩‍👧‍👦 Family Members
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={familyMembers}
              onChange={(e) => setFamilyMembers(e.target.value)}
              className="w-full bg-white text-gray-900 px-3 py-2 text-sm rounded-lg border-0 focus:ring-2 focus:ring-amber-300 font-medium outline-none"
              placeholder="e.g. 4"
              required
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-orange-100 mb-1">
              🧺 Available Ingredients
            </label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full bg-white text-gray-900 px-3 py-2 text-sm rounded-lg border-0 focus:ring-2 focus:ring-amber-300 font-medium outline-none"
              placeholder="e.g. Chicken, Rice, Garlic, Tomatoes"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 text-orange-950 font-bold py-2 px-4 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-orange-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Cooking...</span>
                </>
              ) : (
                <>
                  <span>Recommend</span>
                  <span>✨</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Loading Spinner Indicator */}
        {loading && (
          <div className="mt-4 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center flex flex-col items-center justify-center gap-3 animate-pulse">
            <div className="w-10 h-10 border-4 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-orange-100">
              Chef Gemini AI is analyzing ingredients for {familyMembers} people within NPR {budget}...
            </p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mt-4 bg-rose-500/90 backdrop-blur-md text-white p-3 rounded-lg text-sm font-medium border border-rose-300 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Result Recipe Card */}
        {recipe && !loading && (
          <div className="mt-4 bg-white text-gray-800 p-5 rounded-xl shadow-2xl border border-orange-100 transition-all duration-300">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{recipe.title}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mt-1">
                  <span>🍳 Cuisine: <strong className="text-gray-700">{recipe.cuisine}</strong></span>
                  <span>⏱️ Cook Time: <strong className="text-gray-700">{recipe.cookTime} mins</strong></span>
                  <span> 💳 Budget: <strong className="text-gray-700">Rs. {budget}</strong></span>
                  <span>👥 Servings: <strong className="text-gray-700">{familyMembers} people</strong></span>
                </div>
              </div>

              {user ? (
                <button
                  onClick={handleSaveToRecipes}
                  disabled={saved}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${saved
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 cursor-default'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg'
                    }`}
                >
                  {saved ? '✓ Saved to My Recipes' : '📌 Save to RecipeBox'}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-white text-orange-700 border border-orange-200 hover:bg-orange-50 transition-all shadow-sm flex items-center gap-1.5"
                >
                  🔐 Log in to save this recipe
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-bold text-orange-700 mb-2 text-xs uppercase tracking-wider flex items-center gap-1">
                  <span>📝</span> Ingredients ({recipe.ingredients?.length || 0})
                </h4>
                <ul className="space-y-1 bg-orange-50/50 p-3 rounded-lg border border-orange-100/60 max-h-48 overflow-y-auto">
                  {recipe.ingredients?.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-orange-700 mb-2 text-xs uppercase tracking-wider flex items-center gap-1">
                  <span>📋</span> Instructions ({recipe.steps?.length || 0} steps)
                </h4>
                <ol className="space-y-1.5 bg-gray-50 p-3 rounded-lg border border-gray-100 max-h-48 overflow-y-auto">
                  {recipe.steps?.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="font-bold text-orange-600 min-w-4 text-right">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
