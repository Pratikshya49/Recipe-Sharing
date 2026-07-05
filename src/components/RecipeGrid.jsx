import RecipeCard from './RecipeCard';

// RecipeGrid only receives what it actually needs to do its job:
// the list of recipes to display and the filter state/setters (these
// genuinely belong to the parent Home page, since Home owns the search
// bar). Bookmarks are handled inside RecipeCard via Context instead.
export default function RecipeGrid({
  recipes,
  filteredRecipes,
  bookmarks,
  planner,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  difficultyFilter,
  setDifficultyFilter,
  timeFilter,
  setTimeFilter,
}) {

  // Calculate top statistics
  const totalRecipes = recipes.length;
  const avgCookTime = totalRecipes > 0
    ? Math.round(recipes.reduce((acc, curr) => acc + (curr.prepTime || 0) + (curr.cookTime || 0), 0) / totalRecipes)
    : 0;
  const bookmarkCount = bookmarks.length;

  // Count assigned meal planner slots
  const mealPlanCount = Object.values(planner).reduce((acc, dayMeals) => {
    return acc + Object.values(dayMeals).filter(Boolean).length;
  }, 0);

  // Available categories for filter tags
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks'];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDifficultyFilter('All');
    setTimeFilter('All');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Top Stats Overview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-orange-100 p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center text-lg">🍽️</div>
          <div>
            <span className="block text-xl font-bold text-gray-900">{totalRecipes}</span>
            <span className="block text-xs text-gray-500">Total Recipes</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-orange-100 p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg">⏱️</div>
          <div>
            <span className="block text-xl font-bold text-gray-900">{avgCookTime} min</span>
            <span className="block text-xs text-gray-500">Avg. Cook Time</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-orange-100 p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-lg">📅</div>
          <div>
            <span className="block text-xl font-bold text-gray-900">{mealPlanCount} meals</span>
            <span className="block text-xs text-gray-500">Weekly Schedule</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-orange-100 p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-lg">⭐</div>
          <div>
            <span className="block text-xl font-bold text-gray-900">{bookmarkCount} saved</span>
            <span className="block text-xs text-gray-500">Bookmarks</span>
          </div>
        </div>
      </div>

      {/* Search & Filters Panel */}
      <div className="bg-white rounded-xl border border-orange-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            aria-label="Difficulty Filter"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            aria-label="Time Filter"
          >
            <option value="All">All Cook Times</option>
            <option value="15">&lt; 15 mins</option>
            <option value="30">&lt; 30 mins</option>
            <option value="45">&lt; 45 mins</option>
            <option value="60">1 hour+</option>
          </select>
        </div>

        {/* Quick Click Category Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'Recipe' : 'Recipes'} found
        </h2>
      </div>

      {/* Grid of cards */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-orange-100">
          <div className="text-4xl mb-2">🔍</div>
          <h3 className="font-semibold text-gray-800">No recipes matched your criteria</h3>
          <p className="text-sm text-gray-500 mb-4">Try tweaking your filters or resetting the search keywords.</p>
          <button
            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200"
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
