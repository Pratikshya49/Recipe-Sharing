import { useState } from "react";
import RecipeHeader from "../components/RecipeHeader";
import RecipeGrid from "../components/RecipeGrid";
import { useRecipes } from "../context/RecipeContext";

function Home() {
  const { recipes, loading, bookmarks, planner } = useRecipes();

  // Local UI state - this genuinely belongs to the Home page, not the context,
  // since it only affects what Home displays.
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");

  // Array method practice: filter() combines all active filters.
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesDifficulty = difficultyFilter === "All" || recipe.difficulty === difficultyFilter;
    const matchesTime =
      timeFilter === "All" || recipe.cookTime <= Number(timeFilter);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesTime;
  });

  if (loading) {
    return (
      <div className="text-center py-24 text-gray-500 font-medium">
        Loading recipes...
      </div>
    );
  }

  return (
    <>
      <RecipeHeader />
      <RecipeGrid
        recipes={recipes}
        filteredRecipes={filteredRecipes}
        bookmarks={bookmarks}
        planner={planner}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />
    </>
  );
}

export default Home;
