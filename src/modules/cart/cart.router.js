/**
 * Cart Router Module
 * Handles all cart-related routes and their middleware
 */

import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { addToCart, deleteFromCart } from "./cart.controller.js";

const router = Router();

/**
 * POST /
 * Add item to cart
 * @requires Authentication
 * @access Private
 */
router.post(
    "/",
    isAuthenticated,
    addToCart
);

/**
 * DELETE /
 * Remove item from cart
 * @requires Authentication
 * @access Private
 */
router.delete(
    "/",
    isAuthenticated,
    deleteFromCart
);

/**
 * GET /
 * Retrieve cart contents
 * @status To be implemented
 */
router.get(
    "/"
);

/**
 * PATCH /:code
 * Update cart item
 * @requires Authentication, Admin authorization
 * @status Currently disabled
 */
// router.patch(
//     "/:code",
//     isAuthenticated,
//     isAuthorized("admin"),
//     isValid(),
// );

export default router;
