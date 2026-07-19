import recipe from '../../data/recipe.js'
import { ObjectId } from 'mongodb'

export async function getAll({ cuisine, search } = {}) {// takes time so it is async function
    const query = {}
    if (cuisine) query.cuisine = cuisine
    if (search) query.$text = { $search: search }
    return recipe.find(query)
}

export async function add(newRecipe) {
    return recipe.create(newRecipe)
}

export async function getById(id) {
    return recipe.findById(id)
}



export async function update(id, updatedRecipe) {
    return recipe.findByIdAndUpdate(id, updatedRecipe, {
        new: true,
        runValidators: true,
    })
    // export async function update(id, updatedRecipe){
    // const index = recipes.findIndex(r => r.id == id)
    // if(index === -1) return null
    // recipes.splice(index, 1, newRecipe)
    // return newRecipe
}


// export function remove(id){
//     const index = recipes.findIndex(r => r.id == id)
//     if(index === -1) return null
//     recipes.splice(index, 1)
//     return true
// }
export async function remove(id) {
    return recipe.findByIdAndDelete(id)
}