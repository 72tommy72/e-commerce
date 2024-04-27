import joi from "joi";
import { isValidIdObject } from "../../middleware/validation.middleware.js";

export const createOrderSchema = joi.object({
    address: joi.string().min(10).required(),
    coupon: joi.string().max(5) ,
    phone: joi.string().length(11).regex(/^01[0125][0 - 9]{ 8}$/).required(),
    payment: joi.string().valid('cash','visa').required(),
}).required()
export const cancelOrderSchema = joi.object({
    orderId : joi.string().custom(isValidIdObject).required()
}).required()