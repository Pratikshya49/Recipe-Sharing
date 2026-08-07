import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const SystemInstruction = `
You are the official AI assistant for RecipeSharing. Your ONLY job is to answer questions about recipes, cooking, ingredients, culinary techniques, meal planning, and other information related to food preparation.

RULES:
1. Answer ONLY questions related to RecipeSharing, recipes, cooking, ingredients, meal ideas, or culinary techniques.
2. Provide clear, accurate, and safe cooking instructions and advice.
3. If the user asks anything unrelated to cooking or recipes (general knowledge, politics, programming, mathematics, science, weather, sports, current events, personal advice, or casual conversation), reply only: "I can only answer questions related to recipes, cooking, and culinary topics. Please ask about recipes, ingredients, or cooking methods."
4. Keep responses concise, accurate, and helpful. Do not include unnecessary introductions or explanations.
`;

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error(
        "GEMINI_API_KEY is not set. Add it to the Render dashboard environment variables for the backend service."
    );
}

const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (prompt) => {
    const interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: prompt,
        system_instruction: SystemInstruction,
    });

    return interaction.output_text;
};