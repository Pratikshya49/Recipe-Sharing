import * as recipeModel from '../models/recipeModel.js'

export async function getRecipes(req, res){
    const recipes = await recipeModel.getAll()
    // return res.json(recipes)
    return res.status(200).json(recipes)

}

export async function addRecipes(req, res){
    const recipe = req.body 
     await recipeModel.add(recipe)
    return res.status(201).json({"message": "Recipe added successfully","data":recipe})
}

export async function updateRecipe(req, res) {
    try {
        const id = req.params.id;
        const updatedRecipe = req.body;
        const result = await recipeModel.update(id, updatedRecipe);
        if (!result) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ message: "Recipe updated successfully", data: result });
    } catch (error) {
        return res.status(500).json({ message: "Error updating recipe", error: error.message });
    }
}

export async function deleteRecipe(req, res) {
    try {
        const id = req.params.id;
        const result = await recipeModel.remove(id);
        if (!result) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting recipe", error: error.message });
    }
}