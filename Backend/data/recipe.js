import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema({
    title: {required: true, type: String, trim: true}, // not empty 
    image: {required: true, type: String, trim: true},
    category: {required: true, type: String, trim: true},
    cuisine: {required: true, type: String, trim: true},
    difficulty: {required: true, type: String, trim: true},
    cookTime: {required: true, type: Number},
    ingredients: [{type: String, required: true, trim: true}],
    steps: [{type: String, required: true, trim: true}]
})


const recipe = mongoose.model("Recipe",recipeSchema)

export default recipe