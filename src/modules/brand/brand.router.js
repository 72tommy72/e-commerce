/**
 * Brand Router Module
 * Handles all brand-related routes and their middleware
 */

import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware.js";
import { createBrandSchema, deleteBrandSchema, updateBrandSchema } from "./brand.validation.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { fileUpload } from "../../utils/multer.js";
import { allBrands } from "./brand.controller.js";

// Initialize Express Router
const router = Router();

/**
 * Brand Routes Configuration
 * Defines all available endpoints for brand management
 */

/**
 * @route   POST /createBrand
 * @desc    Create a new brand
 * @access  Admin only
 * @body    {BrandImage} - Brand image file
 */
router.post(
    "/createBrand",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload().single("BrandImage"),
    isValid(createBrandSchema)
);

/**
 * @route   PATCH /:brandId
 * @desc    Update existing brand
 * @access  Admin only
 * @params  {brandId} - Brand ID to update
 * @body    {BrandImage} - Brand image file
 */
router.patch(
    "/:brandId",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload().single("BrandImage"),
    isValid(updateBrandSchema)
);

/**
 * @route   DELETE /:brandId
 * @desc    Delete a brand
 * @access  Admin only
 * @params  {brandId} - Brand ID to delete
 */
router.delete(
    "/:brandId",
    isAuthenticated,
    isAuthorized("admin"),
    isValid(deleteBrandSchema)
);

/**
 * @route   GET /
 * @desc    Retrieve all brands
 * @access  Public
 */
router.get("/", allBrands);

export default router;