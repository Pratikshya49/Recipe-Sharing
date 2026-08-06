import axios from 'axios';

const APIURL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: APIURL,
  withCredentials: true
});

export async function getAIRecipeRecommendation({ ingredients, budget, familyMembers }) {
  const prompt = `Act as an expert chef. Recommend a recipe for ${familyMembers || 2} family members within a total budget of NPR ${budget || 500} (Nepalese Rupees). Available ingredients: ${ingredients || 'any common kitchen ingredients'}. Return a JSON object ONLY with the following exact format: {"title": "String", "cuisine": "String", "cookTime": 30, "difficulty": "Easy", "ingredients": ["ing 1", "ing 2"], "steps": ["step 1", "step 2"]}`;

  try {
    const response = await api.post('/ai/recipe-recommend', { query: prompt });
    
    // Parse response data
    let data = response.data?.data;
    
    if (typeof data === 'string') {
      // Clean potential markdown wrap ```json ... ```
      const cleaned = data.replace(/```json/g, '').replace(/```/g, '').trim();
      try {
        data = JSON.parse(cleaned);
      } catch {
        // Fallback object if raw text returned
        return {
          title: "AI Recommended Recipe",
          cuisine: "Fusion",
          cookTime: 25,
          difficulty: "Medium",
          ingredients: ingredients ? ingredients.split(',').map(i => i.trim()) : ["Various fresh ingredients"],
          steps: [data]
        };
      }
    }
    
    return data;
  } catch (error) {
    console.error("Error generating AI recipe:", error);
    throw error;
  }
}
