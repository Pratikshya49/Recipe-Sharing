import { Router } from "express";
import { getRecipeRecommendation } from "../controllers/aiController.js";
import rateLimit from "../middleware/rateLimiter.js";

const router = Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Rate limit exceeded. Please wait a moment and try again.",
});

router.post("/recipe-recommend", aiLimiter, getRecipeRecommendation);

export default router;