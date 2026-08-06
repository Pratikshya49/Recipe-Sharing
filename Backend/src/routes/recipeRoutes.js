import { Router } from 'express'
import * as recipeController from '../controllers/recipesController.js'
import {recipeRules, handelRecipeValidation} from '../validators/recipeValidators.js'
import authenticate from '../middleware/authenticate.js'


// calling express router
const router = Router()

router.get("/recipes", recipeController.getRecipes)
router.get("/recipes/:id", authenticate, recipeController.getRecipeById)
router.post("/recipes", authenticate, recipeRules, handelRecipeValidation, recipeController.addRecipes)
router.put("/recipes/:id", authenticate, recipeController.updateRecipe)
router.delete("/recipes/:id", authenticate, recipeController.deleteRecipe)


export default router
