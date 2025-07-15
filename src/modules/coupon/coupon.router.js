import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { createCouponSchema, updateCouponSchema, deleteCouponSchema } from "./coupon.validation.js";
import { createCoupon, updateCoupon, deleteCoupon, allCoupons } from "./coupon.controller.js";

const router = Router();

/**
 * @desc    Create new coupon
 * @route   POST /
 * @access  Private (Admin only)
 * @body    {code, discount, expireDate}
 */
router.post(
    "/",
    isAuthenticated,
    isAuthorized("admin"),
    isValid(createCouponSchema),
    createCoupon
);

/**
 * @desc    Update existing coupon
 * @route   PATCH /:code
 * @access  Private (Admin only)
 * @params  code
 * @body    {discount, expireDate}
 */
router.patch(
    "/:code",
    isAuthenticated,
    isAuthorized("admin"),
    isValid(updateCouponSchema),
    updateCoupon
);

/**
 * @desc    Delete coupon
 * @route   DELETE /:code
 * @access  Private (Admin only)
 * @params  code
 */
router.delete(
    "/:code",
    isAuthenticated,
    isAuthorized("admin"),
    isValid(deleteCouponSchema),
    deleteCoupon
);

/**
 * @desc    Get all coupons
 * @route   GET /
 * @access  Public
 */
router.get(
    "/",
    allCoupons
);

export default router;
