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

export function updateRecipe(req, res) {
    return res.status(501).json({ message: "Not implemented yet" })
}

export function deleteRecipe(req, res) {
    return res.status(501).json({ message: "Not implemented yet" })
}