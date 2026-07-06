function RecipeHeader() {
  return (
    <header className="text-center py-10 px-6 bg-gradient-to-b from-orange-50 to-white">
      <h1 className="text-3xl font-bold text-gray-900">
        <span aria-hidden="true">🍽️</span> Discover & Share Recipes
      </h1>
      <p className="text-gray-500 mt-2">
        Find recipes by ingredient, category or cook time — and share your own with the community.
      </p>
    </header>
  );
}

export default RecipeHeader;
