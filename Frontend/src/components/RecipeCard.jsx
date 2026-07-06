import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

function RecipeCard({ recipe }) {
  const { bookmarks, toggleBookmark, deleteRecipe } = useRecipes();
  const isBookmarked = bookmarks.includes(recipe.id);

  // Difficulty badge colors mapping
  const getDifficultyBadgeStyles = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "hard":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const handleDelete = (e) => {
    e.preventDefault(); // Prevent navigating to detail page if clicked
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      deleteRecipe(recipe.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 hover:-translate-y-1 group relative">
      {/* Card Image / Placeholder */}
      <div className="relative h-40 overflow-hidden bg-orange-50">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100/50 to-amber-100 flex flex-col items-center justify-center text-orange-500">
            <span className="text-4xl transition-transform duration-300 group-hover:scale-110">🍽️</span>
            <span className="text-xs font-semibold mt-2 text-orange-800/60 uppercase tracking-wider">No Image</span>
          </div>
        )}

        {/* Delete Button (Top Left) */}
        <button
          onClick={handleDelete}
          aria-label="Delete recipe"
          className="absolute top-2 left-2 w-9 h-9 rounded-full bg-white/95 text-gray-500 hover:text-rose-600 hover:bg-rose-50 shadow-sm border border-gray-100/80 flex items-center justify-center text-sm transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          🗑️
        </button>

        {/* Bookmark Button (Top Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(recipe.id);
          }}
          aria-label="Toggle bookmark"
          className={`absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center text-lg shadow-sm border transition-all duration-200 cursor-pointer ${
            isBookmarked
              ? "bg-amber-500 text-white border-amber-500 hover:bg-amber-600"
              : "bg-white/95 text-gray-400 border-gray-100 hover:text-amber-500"
          }`}
        >
          ★
        </button>

        {/* Cuisine Badge (Bottom Left) */}
        {recipe.cuisine && (
          <span className="absolute bottom-2 left-2 text-xs font-semibold bg-black/55 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {recipe.cuisine}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {recipe.title}
          </h3>
        </div>

        {/* Info Grid */}
        <div className="flex items-center gap-3 mb-4 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1">
            🕐 {recipe.cookTime || 0} min
          </span>
          <span className="text-gray-300">&bull;</span>
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${getDifficultyBadgeStyles(recipe.difficulty)}`}>
            {recipe.difficulty || "Easy"}
          </span>
        </div>

        {/* View Details Link */}
        <Link
          to={`/recipe/${recipe.id}`}
          className="mt-auto w-full text-center text-sm font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-lg py-2.5 transition-all duration-200 shadow-sm shadow-orange-100 hover:shadow-md cursor-pointer"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
