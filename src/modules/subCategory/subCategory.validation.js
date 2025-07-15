import Joi from "joi";
import { isValidIdObject } from "../../middleware/validation.middleware.js";

/**
 * Validation schema for creating a new subcategory
 * Requires:
 * - username (3-10 characters)
 * - valid categoryId
 */
export const createSubCategorySchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(10)
        .required(),
    categoryId: Joi.string().custom(isValidIdObject).required(),
}).required();

// ----------------------------------------

/**
 * Validation schema for updating an existing subcategory
 * Requires:
 * - valid categoryId
 * - valid subCategoryId
 * - optional username (3-10 characters)
 */
export const updateSubCategorySchema = Joi.object({
    categoryId: Joi.string().custom(isValidIdObject).required(),
    subCategoryId: Joi.string().custom(isValidIdObject).required(),
    username: Joi.string()
        .min(3)
        .max(10)
}).required();

// ----------------------------------------

/**
 * Validation schema for deleting a subcategory
 * Requires:
 * - valid categoryId
 * - valid subCategoryId
 */
export const deleteSubCategorySchema = Joi.object({
    categoryId: Joi.string().custom(isValidIdObject).required(),
    subCategoryId: Joi.string().custom(isValidIdObject).required(),
}).required();