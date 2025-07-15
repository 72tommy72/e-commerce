import joi from "joi";
import { isValidIdObject } from "../../middleware/validation.middleware.js";

/**
 * Validation schema for creating a new category
 * @requires name - String between 4-15 characters
 * @requires createdBy - Valid MongoDB ObjectId
 */
export const createCategorySchema = joi.object({
    name: joi.string().min(4).max(15).required(),
    createdBy: joi.string().custom(isValidIdObject) //custom >> validation.middleware
});

/**
 * Validation schema for updating an existing category
 * @requires name - String between 4-15 characters
 * @requires categoryId - Valid MongoDB ObjectId
 */
export const updateCategorySchema = joi.object({
    name: joi.string().min(4).max(15).required(),
    categoryId: joi.string().custom(isValidIdObject) //custom >> validation.middleware
});

/**
 * Validation schema for deleting a category
 * @requires categoryId - Valid MongoDB ObjectId
 */
export const deleteCategorySchema = joi.object({
    categoryId: joi.string().custom(isValidIdObject) //custom >> validation.middleware
});
