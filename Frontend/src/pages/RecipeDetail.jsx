import { useParams, Link, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, bookmarks, toggleBookmark, deleteRecipe } = useRecipes();
  const { user } = useAuth();

  // Find the recipe matching the ID from state
  const recipe = recipes.find((r) => String(r.id) === id);

  if (!recipe) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500 mb-6 text-lg font-medium">We couldn't find that recipe.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold text-sm shadow-md transition"
        >
          &larr; Back to Browse
        </Link>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(recipe.id);

  // Difficulty badge styling
  const getDifficultyBadgeStyles = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "medium":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "hard":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the recipe for "${recipe.title}"?`)) {
      deleteRecipe(recipe.id);
      navigate("/");
    }
  };

  // Fallback for steps if instructions exist as string
  const stepsToRender = recipe.steps || (recipe.instructions ? [recipe.instructions] : []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800 transition mb-6">
        &larr; Back to Browse
      </Link>

      <div className="bg-white rounded-3xl border border-orange-100/50 shadow-sm overflow-hidden mt-2">
        {/* Hero Image Section */}
        <div className="relative h-72 md:h-96 w-full bg-orange-50">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-200 flex flex-col items-center justify-center text-orange-500">
              <span className="text-7xl">🥘</span>
              <span className="text-sm font-bold mt-3 text-orange-800/60 uppercase tracking-wider">No Image Available</span>
            </div>
          )}

          {/* Floating actions on Image */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => {
                if (!user) {
                  navigate("/login");
                  return;
                }
                toggleBookmark(recipe.id);
              }}
              aria-label="Toggle bookmark"
              className={`w-11 h-11 rounded-full flex items-center justify-center text-xl shadow-md border backdrop-blur-sm transition cursor-pointer ${
                isBookmarked
                  ? "bg-amber-500 border-amber-500 text-white hover:bg-amber-600"
                  : "bg-white/90 border-white/20 text-gray-400 hover:text-amber-500"
              }`}
            >
              ★
            </button>
          </div>

          {recipe.cuisine && (
            <span className="absolute bottom-4 left-4 text-xs font-bold bg-black/60 backdrop-blur-sm text-white px-3.5 py-1 rounded-full uppercase tracking-widest">
              {recipe.cuisine}
            </span>
          )}
        </div>

        {/* Content details */}
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{recipe.title}</h1>
              
              <div className="flex items-center gap-3 mt-3 text-sm font-semibold text-gray-500">
                <span className="flex items-center gap-1">⏱️ {recipe.cookTime || 0} mins cook time</span>
                <span>&bull;</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs ${getDifficultyBadgeStyles(recipe.difficulty)}`}>
                  {recipe.difficulty} Difficulty
                </span>
                {recipe.creatorName && (
                  <>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">👤 Posted by <span className="text-orange-700">{recipe.creatorName}</span></span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user && recipe.createdBy === user._id && (
                <Button
                  text="🗑️ Delete Recipe"
                  variant="danger"
                  onClick={handleDelete}
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mt-8">
            {/* Ingredients column */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                {/* 📝 Notepad — professional list/ingredients indicator */}
                <span aria-hidden="true">📝</span> Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-gray-700 text-sm">
                    <span className="text-orange-500 mt-1 text-[8px]">&bull;</span>
                    <span className="leading-snug">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps / Instructions column */}
            <div className="md:col-span-3">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                {/* 📋 Clipboard — professional steps/process indicator */}
                <span aria-hidden="true">📋</span> Preparation Steps
              </h2>
              <ol className="space-y-6">
                {stepsToRender.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700 text-sm leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
