import { Router } from "express";
import { getRecipeRecommendation } from "../controllers/aiController.js";

const router = Router();

router.post("/recipe-recommend", getRecipeRecommendation);

export default router;