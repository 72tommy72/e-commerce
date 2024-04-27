import { catchError } from "../../utils/catchError.js";
import voucher_codes from 'voucher-code-generator';
import { Coupon } from '../../../DB/models/coupon.model.js'

export const createCoupon = catchError(async (req, res, next) => { 
    //generate code
    const code = voucher_codes.generate({ length: 5 }); // []
    //create coupon
    const coupon = await Coupon.create({
        name: code[0],
        discount: req.body.discount,
        expiredAt: new Date(req.body.expiredAt).getTime(), // 24/4/2024
        createdBy: req.user._id
    })
    //response
    return res.status(201).json({
        success: true,
        message : coupon
    })
})
export const updateCoupon = catchError(async (req, res, next) => { 
    //check coupon 
    const coupon = await Coupon.findOne({ name: req.params.code , expiredAt: {$gt: Date.now()}});
    if (!coupon) return next(new Error("Coupon not found"))
    //check owner
    if (!req.user.id !== Coupon.createdBy.toString())
        return next(new Error("not authorized"))

    coupon.discount = req.body.discount? req.body.discount : coupon.discount
    coupon.expiredAt = req.body.expiredAt ? new Date(req.body.expiredAt).getTime() : coupon.expiredAt
    await Coupon.save()
    //response
    return res.status(201).json({
        success: true,
        message:'Coupon updated successfully',
        result : coupon
    })
})
export const deleteCoupon = catchError(async (req, res, next) => { 
    //check coupon 
    const coupon = await Coupon.findOne({ name: req.params.code});
    if (!coupon) return next(new Error("Coupon not found"))
    //check owner
    if (!req.user.id !== Coupon.createdBy.toString())
        return next(new Error("not authorized"))
    //delete coupon
    await Coupon.findOneAndDelete({ name: req.params.code })
    //response
    return res.status(201).json({
        success: true,
        message:'Coupon deleted successfully',

    })
})
export const allCoupons = catchError(async (req, res, next) => { 
    //check coupon 
    const coupons = await Coupon.find();


    //response
    return res.status(201).json({
        success: true,
        message: 'Coupons',
        results : coupons

    })
}) 