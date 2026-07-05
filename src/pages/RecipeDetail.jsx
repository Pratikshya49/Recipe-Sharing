import { useParams, Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import Button from "../components/Button";

// Demonstrates a dynamic route: /recipe/:id
function RecipeDetail() {
  const { id } = useParams();
  const { recipes, bookmarks, toggleBookmark } = useRecipes();

  const recipe = recipes.find((r) => String(r.id) === id);

  if (!recipe) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-600 mb-4">Recipe not found.</p>
        <Link to="/" className="text-orange-700 font-medium hover:underline">
          &larr; Back to Discover
        </Link>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(recipe.id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to="/" className="text-sm text-orange-700 hover:underline">&larr; Back to Discover</Link>

      <div className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden mt-4">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                {recipe.category}
              </span>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">{recipe.title}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {recipe.prepTime + recipe.cookTime} min total &middot; {recipe.difficulty} difficulty
              </p>
            </div>
            <Button
              text={isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
              variant={isBookmarked ? "warning" : "ghost"}
              onClick={() => toggleBookmark(recipe.id)}
            />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Instructions</h2>
          <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
