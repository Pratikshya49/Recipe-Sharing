import Button from "./Button";

function AddRecipe() {
  return (
    <form>
      <input type="text" placeholder="Recipe Name" />

      <textarea
        placeholder="Enter ingredients..."
      ></textarea>

      <textarea
        placeholder="Cooking instructions..."
      ></textarea>

      <Button text="Add Recipe" />
    </form>
  );
}

export default AddRecipe;