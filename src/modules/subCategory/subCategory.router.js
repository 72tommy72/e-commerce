import Router from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import { createSubCategorySchema, deleteSubCategorySchema, updateSubCategorySchema } from "./subCategory.validation.js";
import { createSubCategory, deleteSubCategory, updateSubCategory, allSubCategories } from "./subCategory.controller.js";

const router = Router({ mergeParams: true  }); // to take id from category router
//CRUD

//create
router.post(
    "/",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload(filterObject).single("subCategory"),
    isValid(createSubCategorySchema),
    createSubCategory
);
//update
router.patch(
    "/:subCategoryId",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload(filterObject).single("subCategory"),
    isValid(updateSubCategorySchema),
    updateSubCategory
);
//delete
router.delete(
    "/:subCategoryId",
    isAuthenticated,
    isAuthorized("admin"),
    isValid(deleteSubCategorySchema),
    deleteSubCategory
);
//get
router.get("/", allSubCategories)

export default router;
