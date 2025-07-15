import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { fileUpload } from "../../utils/multer.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { createProduct, deleteProduct, allProducts, singleProduct } from "../product/product.controller.js";
import { createProductSchema, deleteProductSchema } from "./product.validation.js";

const router = Router({ mergeParams: true })

/**
 * Create Product Endpoint
 * @route POST /
 * @desc Creates a new product with images
 * @access Private - Admin only
 */
router.post('/',
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload().fields([
        { name: 'defaultImage', maxCount: 1 }, 
        { name: 'subdefaultImage', maxCount: 3 }
    ]),
    isValid(createProductSchema),
    createProduct
)

/**
 * Delete Product Endpoint
 * @route DELETE /:productId
 * @desc Deletes an existing product
 * @access Private - Admin only
 */
router.delete('/:productId',
    isAuthenticated,
    isAuthorized("admin"),
    isValid(deleteProductSchema),
    deleteProduct
)

/**
 * Get All Products Endpoint
 * @route GET /
 * @desc Retrieves all products
 * @access Public
 */
router.get('/', allProducts)

/**
 * Get Products by Category Endpoint
 * @route GET /category/:categoryId
 * @desc Retrieves all products in a specific category
 * @access Public
 */
router.get('/category/:categoryId', allProducts)

/**
 * Get Single Product Endpoint
 * @route GET /single/:productId
 * @desc Retrieves details of a specific product
 * @access Public
 */
router.get('/single/:productId',
    isValid(deleteProductSchema),
    singleProduct
)

export default router;