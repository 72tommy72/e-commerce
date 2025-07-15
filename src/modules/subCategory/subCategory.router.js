import Router from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { fileUpload } from "../../utils/multer.js";
import { createSubCategorySchema, deleteSubCategorySchema, updateSubCategorySchema } from "./subCategory.validation.js";
import { createSubCategory, deleteSubCategory, updateSubCategory, allSubCategories } from "./subCategory.controller.js";

const router = Router({ mergeParams: true }); // to take id from category router

/**
 * @desc    Create new subcategory
 * @route   POST /api/subcategories
 * @access  Private/Admin
 * @params  none
 * @body    name, image
 */
router.post(
    "/",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload().single("subCategory"),
    isValid(createSubCategorySchema),
    createSubCategory
);

/**
 * @desc    Update existing subcategory
 * @route   PATCH /api/subcategories/:subCategoryId
 * @access  Private/Admin
 * @params  subCategoryId
 * @body    name, image
 */
router.patch(
    "/:subCategoryId",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload().single("subCategory"),
    isValid(updateSubCategorySchema),
    updateSubCategory
);

/**
 * @desc    Delete subcategory
 * @route   DELETE /api/subcategories/:subCategoryId
 * @access  Private/Admin
 * @params  subCategoryId
 */
router.delete(
    "/:subCategoryId",
    isAuthenticated,
    isAuthorized("admin"),
    isValid(deleteSubCategorySchema),
    deleteSubCategory
);

/**
 * @desc    Get all subcategories
 * @route   GET /api/subcategories
 * @access  Public
 */
router.get("/", allSubCategories);

export default router;