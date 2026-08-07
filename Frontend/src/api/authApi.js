import axios from 'axios'

const APIURL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: `${APIURL}/api/auth`,
  withCredentials: true,
})

export function loginUser(userData) {
  return api.post('/login', userData)
}

export function registerUser(userData) {
  return api.post('/register', userData)
}

export function getCurrentUser() {
  return api.get('/me')
}

export function logoutUser() {
  return api.post('/logout')
}

export function getBookmarks() {
  return api.get('/bookmarks')
}

export function toggleBookmark(recipeId) {
  return api.post('/bookmarks/toggle', { recipeId })
}
