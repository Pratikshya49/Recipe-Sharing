import axios from 'axios'

const APIURL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: APIURL,
  withCredentials: true
})

export async function getRecipes() {
  return api.get('/recipes')
}

export function addRecipe(recipe) {
  return api.post('/recipes', recipe)
}

export function updateRecipe(recipeId, recipe) {
  return api.put(`/recipes/${recipeId}`, recipe)
}

export function deleteRecipe(recipeId) {
  return api.delete(`/recipes/${recipeId}`)
}
