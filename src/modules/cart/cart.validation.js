import joi from "joi";

export const createCouponSchema = joi.object({
    discount: joi.number().min(1).max(1).required(),
    expiredAt: joi.date().greater(Date.now()).required(),
}).required()
export const updateCouponSchema = joi.object({
    discount: joi.number().min(1).max(1),
    code: joi.string().length(5).required(),
    expiredAt: joi.date().greater(Date.now()),
}).required()
export const deleteCouponSchema = joi.object({
    code: joi.string().length(5).required(),
}).required()