
import {body, validationResult} from "express-validator"

export const recipeRules = [ // Validation rules for

    body("title")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("title is required and must be a string"),

    body("image")
    .notEmpty()
    .isURL()
    .withMessage("image is required and must be a valid URL"),

    body("category")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("category is required and must be a string"),

    body("cuisine")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("cuisine is required and must be a string"),

    body("difficulty")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("difficulty is required and must be a string"),

    body("cookTime")
    .notEmpty()
    .isNumeric()
    .withMessage("cookTime is required and must be a number"),

    // Arrays validation
    body("ingredients")
    .isArray({ min: 1 })
    .withMessage("ingredients are required and must be an array with at least one item"),

    body("ingredients.*")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("each ingredient is required and must be a non-empty string"),

    body("steps")
    .isArray({ min: 1 })
    .withMessage("steps are required and must be an array with at least one step"),

    body("steps.*")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("each step is required and must be a non-empty string"),



]

export const handelRecipeValidation = (req, res, next ) =>{ // contom middlewave soo we put next to go to nixt middlewave
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()  //if no error then go to next middlewave 

}
