import express from "express"
// import recipes from "./data/recipes.js"
import router from './src/routes/recipeRoutes.js'

const app = express()

app.use(express.json())


const PORT = 3001



app.use("/api",router)


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

