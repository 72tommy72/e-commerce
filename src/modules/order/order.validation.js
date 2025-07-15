import joi from "joi";
import { isValidIdObject } from "../../middleware/validation.middleware.js";

/**
 * Validation schema for creating a new order
 * Validates:
 * - address: string with minimum 10 characters
 * - coupon: optional string with maximum 5 characters
 * - phone: Egyptian phone number format (11 digits starting with 01)
 * - payment: must be either 'cash' or 'visa'
 */
export const createOrderSchema = joi.object({
    address: joi.string().min(10).required(),
    coupon: joi.string().max(5),
    phone: joi.string().length(11).regex(/^01[0125][0-9]{8}$/).required(),
    payment: joi.string().valid('cash', 'visa').required(),
}).required();

/**
 * Validation schema for canceling an existing order
 * Validates:
 * - orderId: must be a valid MongoDB ObjectId
 */
export const cancelOrderSchema = joi.object({
    orderId: joi.string().custom(isValidIdObject).required()
}).required();
