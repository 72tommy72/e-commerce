import Joi from "joi";
import { isValidIdObject } from "../../middleware/validation.middleware.js";

export const createSubCategorySchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(10)
        .required(),
    categoryId: Joi.string().custom(isValidIdObject).required(),
}).required();


export const updateSubCategorySchema = Joi.object({
    categoryId: Joi.string().custom(isValidIdObject).required(),
    subCategoryId: Joi.string().custom(isValidIdObject).required(),
    username: Joi.string()
        .min(3)
        .max(10)
}).required();

export const deleteSubCategorySchema = Joi.object({
    categoryId: Joi.string().custom(isValidIdObject).required(),
    subCategoryId: Joi.string().custom(isValidIdObject).required(),
}).required();