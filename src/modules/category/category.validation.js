import joi from "joi";
import { isValidIdObject } from "../../middleware/validation.middleware.js";



export const createCategorySchema = joi.object({
    name: joi.string().min(4).max(15).required(),
    createdBy: joi.string().custom(isValidIdObject) //custom >> validation.middleware
})
export const updateCategorySchema = joi.object({
    name: joi.string().min(4).max(15).required(),
    categoryId: joi.string().custom(isValidIdObject) //custom >> validation.middleware

})
export const deleteCategorySchema = joi.object({
    categoryId: joi.string().custom(isValidIdObject) //custom >> validation.middleware

})