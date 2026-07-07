import * as RecipeModel from '../models/recipeModel.js'

export function getRecipes(req, res){
    const recipes = RecipeModel.getAll()
    // return res.json(recipes)
    return res.status(200).json(recipes)

}

export function addRecipes(req, res){
    const recipe = req.body 
    RecipeModel.add(recipe)
    return res.status(201).json({"message": "Recipe added successfully","data":recipe})
}

export function updateRecipe(req, res){
    const updated = RecipeModel.update(req.params.id, req.body)
    if(!updated) return res.status(404).json({ error: "Recipe not found" })
    return res.status(200).json({ message: "Recipe updated successfully", data: updated })
}

export function deleteRecipe(req, res){
    const deleted = RecipeModel.remove(req.params.id)
    if(!deleted) return res.status(404).json({ error: "Recipe not found" })
    return res.status(200).json({ message: "Recipe deleted successfully" })
}