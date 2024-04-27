import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { createProduct, deleteProduct, allProducts, singleProduct } from "../product/product.controller.js";
import { createProductSchema, deleteProductSchema } from "./product.validation.js";

const router = Router({ mergeParams: true })

//createProduct
router.post('/',
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload(filterObject.image).fields([{ name: 'defaultImage', maxCount: 1 }, { name: 'subdefaultImage', maxCount: 3 }]),
    isValid(createProductSchema),
    createProduct)

//deleteProduct
router.delete('/:productId',
    isAuthenticated,
    isAuthorized("admin"),
    isValid(deleteProductSchema),
    deleteProduct)

//allProducts
router.get('/', allProducts)

//allProducts
router.get('/category/:categoryId', allProducts)

//singleProduct
router.get('/single/:productId',
    isValid(deleteProductSchema),  // the same schema
    singleProduct)


export default router;