import joi from "joi";
import { isValidIdObject } from "../../middleware/validation.middleware.js";

export const createProductSchema = joi.object({
    name: joi.string().min(2).max(20).required(),
    description: joi.string(),
    availableItems: joi.number().min(1).required(),
    price: joi.number().min(1).required(),
    discount: joi.number().min(1).max(100),
    category: joi.string().custom(isValidIdObject),
    subCategory: joi.string().custom(isValidIdObject),
    brand: joi.string().custom(isValidIdObject)
}).required()
export const deleteProductSchema = joi.object({
    productId: joi.string().custom(isValidIdObject) //custom >> validation.middleware

})