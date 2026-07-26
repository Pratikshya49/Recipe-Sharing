import * as AuthModel from '../models/authModel.js'

export async function registerUser(req, res) {
  const user = await AuthModel.register(req.body)
  if (user) {
    return res
      .status(201)
      .json({ message: 'User registered successfully', data: user })
  }
  return res
    .status(400)
    .json({ error: 'Please provide user details correctly' })
}

export async function loginUser(req, res) {
  const user = await AuthModel.login(req.body)
  if (user) {
    return res
      .status(201)
      .json({ message: 'User registered successfully', data: user })
  }
  return res
    .status(400)
    .json({ error: 'Please provide user details correctly' })
}