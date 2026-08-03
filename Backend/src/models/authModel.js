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