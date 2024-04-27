import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { addToCart, deleteFromCart } from "./cart.controller.js";

const router = Router();
//CRUD
//create
router.post(
    "/",
    isAuthenticated,
    addToCart
);
//update
// router.patch(
//     "/:code",
//     isAuthenticated,
//     isAuthorized("admin"),
//     isValid(),

// );
//delete
router.delete(
    "/",
    isAuthenticated,
    deleteFromCart
    
);
router.get(
    "/",
    
);

export default router;
