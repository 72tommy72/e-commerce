import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware.js";
import { createCategorySchema, deleteCategorySchema, updateCategorySchema } from "./category.validation.js";
import { createCategory, deleteCategory, updateCategory, allCategories } from "./category.controller.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import subCategoryRouter from "../subCategory/subCategory.router.js";
import productRouter from "../product/product.router.js";
import { fileUpload } from "../../utils/multer.js";

const router = Router();

/**
 * Nested Routes
 * ============================================
 */

/**
 * SubCategory Routes
 * Handles all subcategory operations under a specific category
 */
router.use("/:categoryId/subCategory", subCategoryRouter);

/**
 * Product Routes
 * Handles all product operations under a specific category
 */
router.use("/:categoryId/product", productRouter);

/**
 * Category Routes
 * ============================================
 */

/**
 * Create Category
 * POST /createCategory
 * Requires authentication and admin privileges
 * Accepts form-data with category image
 */
router.post(
    "/createCategory",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload().single("categoryImage"),
    isValid(createCategorySchema),
    createCategory
);

/**
 * Update Category
 * PATCH /:categoryId
 * Requires authentication and admin privileges
 * Accepts form-data with updated category image
 */
router.patch(
    "/:categoryId",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload().single("categoryImage"),
    isValid(updateCategorySchema),
    updateCategory
);

/**
 * Delete Category
 * DELETE /:categoryId
 * Requires authentication and admin privileges
 */
router.delete(
    "/:categoryId",
    isAuthenticated,
    isAuthorized("admin"),
    isValid(deleteCategorySchema),
    deleteCategory
);

/**
 * Get All Categories
 * GET /
 * Public route - no authentication required
 */
router.get("/", allCategories);

export default router;