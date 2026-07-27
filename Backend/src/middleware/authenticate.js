import { verifyToken } from '../utils/auth.js'

const authenticate = (req, res, next) => {
  const token = req.cookies?.jvtToken
  if (!token)
    return res.status(401).json({ error: 'Unauthorized' })
  try {
    const isValid = verifyToken(token)
    if (!isValid) return res.status(401).json({ error: 'Invalid Token' })
    req.user = isValid
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' })
  }
}

export default authenticate
