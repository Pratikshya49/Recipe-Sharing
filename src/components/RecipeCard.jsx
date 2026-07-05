import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

// Note: this card pulls bookmark state straight from Context instead of
// receiving it as a prop from RecipeGrid -> RecipeCard. That is the
// "prop drilling" fix described in the Week 2 tutorial: RecipeGrid never
// needs to know about bookmarks at all.
function RecipeCard({ recipe }) {
  const { bookmarks, toggleBookmark } = useRecipes();
  const isBookmarked = bookmarks.includes(recipe.id);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
        <button
          onClick={() => toggleBookmark(recipe.id)}
          aria-label="Toggle bookmark"
          className={`absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center text-lg shadow ${
            isBookmarked ? "bg-orange-600 text-white" : "bg-white/90 text-orange-600"
          }`}
        >
          {isBookmarked ? "★" : "☆"}
        </button>
        <span className="absolute bottom-2 left-2 text-xs font-medium bg-white/90 text-orange-700 px-2 py-0.5 rounded-full">
          {recipe.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{recipe.title}</h3>
        <p className="text-xs text-gray-500 mb-3">
          {recipe.prepTime + recipe.cookTime} min &middot; {recipe.difficulty}
        </p>
        <Link
          to={`/recipe/${recipe.id}`}
          className="mt-auto text-center text-sm font-medium bg-orange-600 hover:bg-orange-700 text-white rounded-lg py-2 transition-colors"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
