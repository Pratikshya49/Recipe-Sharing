import * as recipeModel from '../models/recipeModel.js'
import { getUserById } from '../models/authModel.js'

export async function getRecipes(req, res){
    try {
        const { cuisine, search } = req.query
        const recipes = await recipeModel.getAll({ cuisine, search })
        return res.status(200).json(recipes)
    } catch (error) {
        return res.status(500).json({ message: "Error fetching recipes", error: error.message })
    }
}

export async function addRecipes(req, res){
    try {
        const recipe = req.body
        if (req.user?.userId) {
            const user = await getUserById(req.user.userId)
            recipe.creatorName = user?.name || null
        }
        const created = await recipeModel.add(recipe)
        return res.status(201).json({ message: "Recipe added successfully", data: created })
    } catch (error) {
        return res.status(500).json({ message: "Error adding recipe", error: error.message })
    }
}

export async function getRecipeById(req, res) {
    try {
        const result = await recipeModel.getById(req.params.id)
        if (!result) {
            return res.status(404).json({ message: "Recipe not found" })
        }
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ message: "Error fetching recipe", error: error.message })
    }
}

export async function updateRecipe(req, res) {
    try {
        const id = req.params.id;
        const existing = await recipeModel.getById(id);
        if (!existing) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        if (existing.createdBy && existing.createdBy.toString() !== String(req.user?.userId)) {
            return res.status(403).json({ message: "You are not authorized to update this recipe" });
        }
        const updatedRecipe = req.body;
        delete updatedRecipe.createdBy;
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
        const existing = await recipeModel.getById(id);
        if (!existing) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        if (existing.createdBy && existing.createdBy.toString() !== String(req.user?.userId)) {
            return res.status(403).json({ message: "You are not authorized to delete this recipe" });
        }
        const result = await recipeModel.remove(id);
        if (!result) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting recipe", error: error.message });
    }
}