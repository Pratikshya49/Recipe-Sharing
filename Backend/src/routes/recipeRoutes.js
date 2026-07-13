import { Router } from 'express'
import * as recipeController from '../controllers/recipesController.js'
import {recipeRules, handelRecipeValidation} from '../validators/recipeValidators.js'


// calling express router
const router = Router()

router.get("/recipes", recipeController.getRecipes)
router.post("/recipes", recipeRules, handelRecipeValidation, recipeController.addRecipes)
router.put("/recipes/:id", recipeController.updateRecipe)
router.delete("/recipes/:id", recipeController.deleteRecipe)


export default router
