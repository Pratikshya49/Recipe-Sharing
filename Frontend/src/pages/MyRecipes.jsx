import { useRecipes } from "../context/RecipeContext";
import { useAuth } from "../context/AuthContext";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

export default function MyRecipes() {
  const { recipes, bookmarks, loading } = useRecipes();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-500 font-medium animate-pulse">Loading recipes...</div>
      </div>
    );
  }

  // Filter recipes
  const myCreatedRecipes = recipes.filter(
    (r) => r.isUserAdded || (user && r.createdBy && String(r.createdBy) === String(user._id))
  );
  const bookmarkedRecipes = recipes.filter(r => bookmarks.includes(r.id));

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header section */}
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          My Culinary Space
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your personal creations and saved recipes in one place.
        </p>
      </header>

      {/* Created Recipes Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between border-b border-orange-100 pb-3 mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>✍️</span> My Created Recipes ({myCreatedRecipes.length})
          </h2>
          {myCreatedRecipes.length > 0 && (
            <Link
              to="/add"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
            >
              + Create New
            </Link>
          )}
        </div>

        {myCreatedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCreatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-orange-200 p-8 shadow-sm">
            <div className="text-4xl mb-3">🍲</div>
            <h3 className="font-semibold text-gray-800">No custom recipes yet</h3>
            <p className="text-sm text-gray-500 mb-4 mt-1">
              Have a secret family recipe? Share it with the community now!
            </p>
            <Link
              to="/add"
              className="inline-flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium shadow-sm transition"
            >
              Add Your First Recipe
            </Link>
          </div>
        )}
      </section>

      {/* Bookmarks Section */}
      <section>
        <div className="flex items-center border-b border-orange-100 pb-3 mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>⭐</span> Bookmarked Recipes ({bookmarkedRecipes.length})
          </h2>
        </div>

        {bookmarkedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-orange-200 p-8 shadow-sm">
            <div className="text-4xl mb-3">🔖</div>
            <h3 className="font-semibold text-gray-800">No bookmarked recipes</h3>
            <p className="text-sm text-gray-500 mb-4 mt-1">
              Browse recipes on the home page and click the star to save them here.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-4 py-2 bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-lg text-sm font-medium transition"
            >
              Browse Recipes
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
