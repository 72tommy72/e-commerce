import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { createOrderSchema, cancelOrderSchema } from "./order.validation.js";
import { createOrder, cancelOrder } from "./order.controller.js";

const router = Router()

/**
 * @desc Create new order
 * @route POST /order
 * @access Private - Requires authentication
 * @validation Validates order creation data
 */
router.post('/', 
    isAuthenticated, 
    isValid(createOrderSchema), 
    createOrder
)

/**
 * @desc Cancel existing order
 * @route PATCH /order/:orderId
 * @access Private - Requires authentication
 * @validation Validates order cancellation data
 */
router.patch('/:orderId', 
    isAuthenticated, 
    isValid(cancelOrderSchema), 
    cancelOrder
)

export default router;
