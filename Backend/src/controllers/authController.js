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