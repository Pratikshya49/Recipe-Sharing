import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './src/routes/authRoutes.js'
import recipeRoutes from './src/routes/recipeRoutes.js'
import dbConnection from './src/config/db.js'
import cookieParser from 'cookie-parser'
import aiRouter from "./src/routes/aiRoute.js";

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(cors(
  {
    origin:(origin, callback)=>{
      if(!origin || origin.startsWith('http://localhost:') || origin.endsWith('.netlify.app') || origin === process.env.FRONTEND_URL ){
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
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, message: "Server is healthy" });
});
app.use('/api/auth', authRoutes)
app.use('/auth', authRoutes)
app.use('/api', recipeRoutes)
app.use('/', recipeRoutes)
app.use("/ai", aiRouter);

await dbConnection()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})