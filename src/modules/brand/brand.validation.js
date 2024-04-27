import joi from "joi";
import { isValidIdObject } from "../../middleware/validation.middleware.js";



export const createBrandSchema = joi.object({
    name: joi.string().min(4).max(15).required(),
    createdBy: joi.string().custom(isValidIdObject) //custom >> validation.middleware
})
export const updateBrandSchema = joi.object({
    name: joi.string().min(4).max(15).required(),
    brandId: joi.string().custom(isValidIdObject).required() //custom >> validation.middleware

})
export const deleteBrandSchema = joi.object({
    brandId: joi.string().custom(isValidIdObject).required() //custom >> validation.middleware

})