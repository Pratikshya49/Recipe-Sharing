import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config({
  path: './.env',
})

const JWT_SECRET =
  process.env.JWT_SECRET ||
  's7xNX7rmvKElVEH6Az89mhERvGPUKcatW75YX0HDltwj7Lcm6kPcbg'

export const generateToken = (user) => {
  return jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}
