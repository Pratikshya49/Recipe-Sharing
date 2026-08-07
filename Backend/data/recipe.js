import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema({
    title: {required: true, type: String, trim: true}, // not empty 
    image: {required: true, type: String, trim: true},
    category: {required: true, type: String, trim: true},
    cuisine: {required: true, type: String, trim: true},
    difficulty: {required: true, type: String, trim: true},
    cookTime: {required: true, type: Number},
    ingredients: [{type: String, required: true, trim: true}],
    steps: [{type: String, required: true, trim: true}],
    createdBy: {type: String, required: false}, // Added to fulfill Week 4 requirements (usually set to required:true once auth is added in Week 5)
    creatorName: {type: String, required: false} // Display name of the user who posted the recipe
})


// Text index enables GET /api/recipes?search=pasta to work with $text queries
recipeSchema.index({ title: "text", ingredients: "text" })

const recipe = mongoose.model("Recipe",recipeSchema)

export default recipe