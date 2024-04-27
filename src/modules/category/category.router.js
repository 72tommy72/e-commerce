import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware.js";
import { createCategorySchema, deleteCategorySchema, updateCategorySchema } from "./category.validation.js";
import { createCategory, deleteCategory, updateCategory, allCategories } from "./category.controller.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { filterObject, fileUpload } from "../../utils/multer.js";
import  subCategoryRouter  from "../subCategory/subCategory.router.js";
import productRouter  from "../product/product.router.js";



const router = Router();

//subCategory
router.use("/:categoryId/subCategory", subCategoryRouter)
//product
router.use("/:categoryId/product", productRouter)

//create category
router.post(
    "/createCategory",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload(filterObject.image).single("categoryImage"), // form -data 
    isValid(createCategorySchema), // multer turn data to json because express do not support that
    createCategory
);
//update category
router.patch(
    "/:categoryId",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload(filterObject.image).single("categoryImage"), // form -data 
    isValid(updateCategorySchema), // multer turn data to json because express do not support that
    updateCategory
);
//delete category
router.delete(
    "/:categoryId",
    isAuthenticated,
    isAuthorized("admin"),
    isValid(deleteCategorySchema), // multer turn data to json because express do not support that
    deleteCategory
);
//get category
router.get("/", allCategories)
export default router;
