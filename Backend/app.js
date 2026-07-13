import express from "express"
import dotenv from "dotenv"
import cors from "cors"
// import recipes from "./data/recipes.js"
import router from './src/routes/recipeRoutes.js'
import dbConnection from './src/config/db.js'



const app = express()
dotenv.config() // call dotenv dont need to put root cause it is in the


app.use(express.json())  // use of middlewaves using use  // CORSE is also middlewaves// request and response 
app.use(cors()) // use of middlewaves using use // CORS is also misslewaves



const PORT = process.env.PORT || 3000 // execing file , if noot excess from front soo use of || 3000 s


app.use("/api", router)

await dbConnection() // call the function to connect to the database


// //for reading 
// app.get("/recipes",(req, res)=> {
//     return res.json(recipes)
// })


// // for post request
// app.post("/recipes", (req, res) => {
//     const newRecipe = req.body        
//     recipes.push(newRecipe)           
//     return res.status(201).json({ "message": "Recipe added successfully" })
// })







// app.put("/recipes/:id", (req, res) => {
//     const newRecipe = req.body;

//     const index = recipes.findIndex(recipe => recipe.id == req.params.id);

//     if (index === -1) {
//         return res.status(404).json({
//             error: "Recipe not found"
//         });
//     }

//     recipes.splice(index, 1, newRecipe);

//     res.json({
//         message: "Recipe updated successfully"
//     });
// });




// app.delete("/recipes/:id", (req, res) => {
//     const index = recipes.findIndex((recipe) => recipe.id == req.params.id);

//     if (index === -1) {
//         return res.status(404).json({ error: "Recipe not found" });
//     }

//     recipes.splice(index, 1);

//     res.json({ message: "Recipe deleted successfully" });
// });





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    //  console.log(`Backend is running on port ${PORT}`)
})

