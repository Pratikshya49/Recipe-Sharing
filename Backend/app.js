import express from "express"
import recipes from "./data/recipes.js"
const app = express()

app.use(express.json())


const PORT = 3001





//for reading 
app.get("/recipes",(req, res)=> {
    return res.json(recipes)
})


// // fro post request 
// app.post( "/recipes",(req, res)=> {

//     const recipes = req.body
//     recipes.push(recipes)
//     return res.status(201).json({"message": "Recipe added successfully"})
// })

// for post request
app.post("/recipes", (req, res) => {
    const newRecipe = req.body        // ✅ different name, no shadowing
    recipes.push(newRecipe)           // ✅ push the new recipe into the imported array
    return res.status(201).json({ "message": "Recipe added successfully" })
})

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`)
    //  console.log(`Backend is running on port ${PORT}`)
})

