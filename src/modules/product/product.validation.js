import joi from "joi";
import { isValidIdObject } from "../../middleware/validation.middleware.js";

/**
 * Create Product Validation Schema
 * Validates the required fields when creating a new product:
 * - name: String (2-20 chars)
 * - description: Optional string
 * - availableItems: Number (min 1)
 * - price: Number (min 1)
 * - discount: Optional number (1-100)
 * - category: Valid ObjectId
 * - subCategory: Valid ObjectId
 * - brand: Valid ObjectId
 */
export const createProductSchema = joi.object({
    name: joi.string().min(2).max(20).required(),
    description: joi.string(),
    availableItems: joi.number().min(1).required(),
    price: joi.number().min(1).required(),
    discount: joi.number().min(1).max(100),
    category: joi.string().custom(isValidIdObject),
    subCategory: joi.string().custom(isValidIdObject),
    brand: joi.string().custom(isValidIdObject)
}).required();

// ====================================

/**
 * Delete Product Validation Schema
 * Validates the product ID when deleting a product
 * - productId: Must be a valid MongoDB ObjectId
 */
export const deleteProductSchema = joi.object({
    productId: joi.string().custom(isValidIdObject)
});
