import joi from "joi";

/**
 * Validation schema for creating a new coupon
 * Requires:
 * - discount: number between 1-100
 * - expiredAt: future date
 */
export const createCouponSchema = joi.object({
    discount: joi.number()
        .min(1)
        .max(100)
        .required()
        .messages({
            'number.base': 'Discount must be a number',
            'number.min': 'Discount must be at least 1%',
            'number.max': 'Discount cannot exceed 100%'
        }),
    expiredAt: joi.date()
        .greater(Date.now())
        .required()
        .messages({
            'date.base': 'Expiry date must be a valid date',
            'date.greater': 'Expiry date must be in the future'
        })
}).required();

/**
 * Validation schema for updating an existing coupon
 * Requires:
 * - code: 5 character string
 * Optional:
 * - discount: number between 1-100
 * - expiredAt: future date
 */
export const updateCouponSchema = joi.object({
    discount: joi.number()
        .min(1)
        .max(100)
        .messages({
            'number.base': 'Discount must be a number',
            'number.min': 'Discount must be at least 1%',
            'number.max': 'Discount cannot exceed 100%'
        }),
    code: joi.string()
        .length(5)
        .required()
        .messages({
            'string.length': 'Coupon code must be exactly 5 characters'
        }),
    expiredAt: joi.date()
        .greater(Date.now())
        .messages({
            'date.greater': 'Expiry date must be in the future'
        })
}).required();

/**
 * Validation schema for deleting a coupon
 * Requires:
 * - code: 5 character string
 */
export const deleteCouponSchema = joi.object({
    code: joi.string()
        .length(5)
        .required()
        .messages({
            'string.length': 'Coupon code must be exactly 5 characters'
        })
}).required();
