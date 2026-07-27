import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './src/routes/authRoutes.js'
import recipeRoutes from './src/routes/recipeRoutes.js'
import dbConnection from './src/config/db.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(cors(
  {
    origin:(origin, callback)=>{
      if(!origin || ['http://localhost:5173',process.env.FRONTEND_URL].includes(origin) ){
        return callback(null, true)
      }
      callback(new Error("CORS origin not allowed"))
    }
    ,credentials:true
  }
))
app.use(express.json())

const PORT = process.env.PORT || 3001

// Route mounts
app.use('/auth', authRoutes)
app.use('/api', recipeRoutes) // Mount recipes under /api (e.g. /api/recipes) to match frontend

await dbConnection()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})