import bcrypt from 'bcrypt'
import User from '../../data/user.js'

export async function register(userDetails) {
  return User.create(userDetails)
}

export async function login({ email, password }) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User not found')
  }
  console.log(user.password)
  const isValid = await bcrypt.compare(password, user.password)
  return isValid ? user : null
}

export const getUserById = async (id) => {
  const user = await User.findById(id)
  return user
}

export const getBookmarks = async (userId) => {
  const user = await User.findById(userId)
  return user?.bookmarks || []
}

export const toggleBookmark = async (userId, recipeId) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  const bookmarks = user.bookmarks || []
  const index = bookmarks.findIndex((b) => String(b) === String(recipeId))
  if (index === -1) {
    bookmarks.push(recipeId)
  } else {
    bookmarks.splice(index, 1)
  }
  user.bookmarks = bookmarks
  await user.save()
  return bookmarks
}