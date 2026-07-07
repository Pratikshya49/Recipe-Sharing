import { Router } from 'express'
import * as recipeController from '../controllers/recipesController.js'

// calling express router
const router = Router()

router.get("/recipes", recipeController.getRecipes)
router.post("/recipes", recipeController.addRecipes)
router.put("/recipes/:id", recipeController.updateRecipe)
router.delete("/recipes/:id", recipeController.deleteRecipe)


export default router
