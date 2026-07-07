import recipes from '../../data/recipes.js'

export function getAll(){
    return recipes
}

export function add(recipe){
    recipes.push(recipe)
}

export function update(id, newRecipe){
    const index = recipes.findIndex(r => r.id == id)
    if(index === -1) return null
    recipes.splice(index, 1, newRecipe)
    return newRecipe
}

export function remove(id){
    const index = recipes.findIndex(r => r.id == id)
    if(index === -1) return null
    recipes.splice(index, 1)
    return true
}