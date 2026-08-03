import { generateAIResponse } from "../services/geminiApi.js";

export const getRecipeRecommendation = async (req, res) => {
    try {
        const response = await generateAIResponse(req.body.query);
        return res.status(200).json({ data: response });
    } catch (error) {
        if (error.status === 429) {
            res.status(429).json({ error: "Rate limit exceeded." });
        } else if (error.status === 500) {
            res.status(500).json({ error: "Internal server error." });
        } else {
            res

                .status(500)
                .json({ error: error.message || "An unexpected error occurred." });
        }
    }
};