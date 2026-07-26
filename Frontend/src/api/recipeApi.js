import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
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
