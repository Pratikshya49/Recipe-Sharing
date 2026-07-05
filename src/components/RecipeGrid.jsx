import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

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
  // 6. State to hold calculated statistics
  const [totalCount, setTotalCount] = useState(0);
  const [avgCookTime, setAvgCookTime] = useState(0);

  // 6. useEffect to compute total count and average cook time for the dashboard
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTotalCount(recipes.length);
    
    const totalCookTime = recipes.reduce((acc, curr) => acc + (Number(curr.cookTime) || 0), 0);
    const avg = recipes.length > 0 ? Math.round(totalCookTime / recipes.length) : 0;
    
    setAvgCookTime(avg);
  }, [recipes]);

  // Count bookmarked and weekly planner slots
  const bookmarkCount = bookmarks.length;
  const mealPlanCount = Object.values(planner).reduce((acc, dayMeals) => {
    return acc + Object.values(dayMeals).filter(Boolean).length;
  }, 0);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks'];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDifficultyFilter('All');
    setTimeFilter('All');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Dashboard Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-white to-orange-50/20 rounded-2xl border border-orange-100/60 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-xl">🍽️</div>
          <div>
            <span className="block text-2xl font-black text-gray-900 leading-tight">{totalCount}</span>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">Total Recipes</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-emerald-50/20 rounded-2xl border border-emerald-100/60 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl">⏱️</div>
          <div>
            <span className="block text-2xl font-black text-gray-900 leading-tight">{avgCookTime} min</span>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">Avg. Cook Time</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-amber-50/20 rounded-2xl border border-amber-100/60 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl">📅</div>
          <div>
            <span className="block text-2xl font-black text-gray-900 leading-tight">{mealPlanCount} meals</span>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">Meal Planner</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-rose-50/20 rounded-2xl border border-rose-100/60 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center text-xl">⭐</div>
          <div>
            <span className="block text-2xl font-black text-gray-900 leading-tight">{bookmarkCount} saved</span>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">Bookmarks</span>
          </div>
        </div>
      </div>

      {/* Control Panel (Search & Filters) */}
      <div className="bg-white rounded-2xl border border-orange-100/50 p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-5">
          <div className="flex-1 relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search recipes by title..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <select
              className="w-full sm:w-auto px-4 py-2.5 border border-gray-150 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer"
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
              className="w-full sm:w-auto px-4 py-2.5 border border-gray-150 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              aria-label="Time Filter"
            >
              <option value="All">All Cook Times</option>
              <option value="10">&le; 10 mins</option>
              <option value="20">&le; 20 mins</option>
              <option value="30">&le; 30 mins</option>
              <option value="60">&le; 60 mins</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-50">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white border-orange-600 shadow-sm shadow-orange-100'
                  : 'bg-gray-50/50 text-gray-600 border-gray-200/80 hover:bg-orange-50/40 hover:border-orange-200'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'Recipe' : 'Recipes'} Available
        </h2>
      </div>

      {/* Grid of Recipe Cards */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-orange-100/50 p-8 shadow-sm">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-bold text-gray-800 text-lg">No recipes found</h3>
          <p className="text-sm text-gray-500 mb-6 mt-1">We couldn't find any recipes matching your current filters.</p>
          <button
            className="px-5 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl text-sm font-semibold transition cursor-pointer"
            onClick={handleResetFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
