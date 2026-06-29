function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />

      <h2>{recipe.title}</h2>

      <p>{recipe.ingredients}</p>

      <button>View Recipe</button>
    </div>
  );
}

export default RecipeCard;