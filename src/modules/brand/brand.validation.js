import joi from "joi";
import { isValidIdObject } from "../../middleware/validation.middleware.js";

/**
 * Validation schemas for Brand operations using Joi
 */

/**
 * Schema for creating a new brand
 * @property {string} name - Brand name (4-15 characters)
 * @property {string} createdBy - User ID who created the brand (must be valid ObjectId)
 */
export const createBrandSchema = joi.object({
    name: joi.string()
        .min(4)
        .max(15)
        .required()
        .trim(),
    createdBy: joi.string()
        .custom(isValidIdObject)
});

/**
 * Schema for updating an existing brand
 * @property {string} name - New brand name (4-15 characters)
 * @property {string} brandId - Brand ID to update (must be valid ObjectId)
 */
export const updateBrandSchema = joi.object({
    name: joi.string()
        .min(4)
        .max(15)
        .required()
        .trim(),
    brandId: joi.string()
        .custom(isValidIdObject)
        .required()
});

/**
 * Schema for deleting a brand
 * @property {string} brandId - Brand ID to delete (must be valid ObjectId)
 */
export const deleteBrandSchema = joi.object({
    brandId: joi.string()
        .custom(isValidIdObject)
        .required()
});
