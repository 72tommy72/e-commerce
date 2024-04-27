import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { createOrderSchema, cancelOrderSchema } from "./order.validation.js";
import { createOrder, cancelOrder } from "./order.controller.js";

const router = Router()

router.post('/', isAuthenticated, isValid(createOrderSchema), createOrder)
router.patch('/:orderId', isAuthenticated, isValid(cancelOrderSchema), cancelOrder)

export default router;
