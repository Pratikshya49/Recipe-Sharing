import * as AuthModel from '../models/authModel.js'
import { generateToken } from '../utils/auth.js'

const cookieOption={
  httpOnly:true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: process.env.NODE_ENV == 'production' ? 'none':'lax', // none = f and d i s interially differnnt,strict , lax localhost mai f and d
  secure: process.env.NODE_ENV == 'production',// assgin  true or flase 
}

export async function registerUser(req, res) {
  try {
    const user = await AuthModel.register(req.body)
    if (user) {
      const token = generateToken(user)
      res.cookie('jvtToken',token,cookieOption)
      return res.status(201).json({
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
       
        },
      })
    }
    return res
      .status(400)
      .json({ error: 'Please provide user details correctly' })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email is already registered' })
    }
    return res.status(400).json({ error: error.message || 'Please provide user details correctly' })
  }
}

export async function loginUser(req, res) {
  try {
    const user = await AuthModel.login(req.body)
    if (user) {
      const token = generateToken(user)
      res.cookie('jvtToken',token,cookieOption)
        
      return res.status(200).json({
      
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token,
        },
      })
    }
    return res
      .status(400)
      .json({ error: 'Please provide user details correctly' })
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Please provide user details correctly' })
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    const user = await AuthModel.getUserById(req.user.userId || req.user._id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    return res.status(200).json({
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        bookmarks: user.bookmarks || [],
      },
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await AuthModel.getBookmarks(req.user.userId || req.user._id)
    return res.status(200).json({ data: bookmarks })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const toggleBookmark = async (req, res) => {
  try {
    const { recipeId } = req.body
    if (!recipeId) {
      return res.status(400).json({ error: 'recipeId is required' })
    }
    const bookmarks = await AuthModel.toggleBookmark(
      req.user.userId || req.user._id,
      recipeId
    )
    return res.status(200).json({ data: bookmarks })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie('jvtToken', cookieOption)
  res.clearCookie('jwtToken', cookieOption)
  return res.status(200).json({ message: 'Logged out successfully' })
}