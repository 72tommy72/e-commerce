import joi from "joi";

/**
 * Validation schema for creating a new coupon
 * @param {number} discount - Coupon discount value (between 1 and 100)
 * @param {date} expiredAt - Coupon expiration date (must be in the future)
 */
export const createCouponSchema = joi.object({
    discount: joi.number().min(1).max(1).required(),
    expiredAt: joi.date().greater(Date.now()).required(),
}).required();

// ====================================

/**
 * Validation schema for updating an existing coupon
 * @param {number} discount - Optional: Updated discount value
 * @param {string} code - Coupon code (must be 5 characters)
 * @param {date} expiredAt - Optional: Updated expiration date
 */
export const updateCouponSchema = joi.object({
    discount: joi.number().min(1).max(1),
    code: joi.string().length(5).required(),
    expiredAt: joi.date().greater(Date.now()),
}).required();

// ====================================

/**
 * Validation schema for deleting a coupon
 * @param {string} code - Coupon code to delete (must be 5 characters)
 */
export const deleteCouponSchema = joi.object({
    code: joi.string().length(5).required(),
}).required();
