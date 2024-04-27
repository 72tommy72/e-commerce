import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware.js";
import { createBrandSchema, deleteBrandSchema, updateBrandSchema } from "./brand.validation.js";
// import { createBrand, deleteBrand, updateBrand, allBrands } from "./brand.controller.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { filterObject, fileUpload } from "../../utils/multer.js";
import brandRouter from "./../../modules/brand/brand.router.js";



const router = Router();

//subBrand
// router.use("/:brandId/subBrand", createBrand)

//create Brand
router.post(
    "/createBrand",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload(filterObject.image).single("BrandImage"), // form -data 
    isValid(createBrandSchema), // multer turn data to json because express do not support that
    // createBrand
);
//update Brand
router.patch(
    "/:brandId",
    isAuthenticated,
    isAuthorized("admin"),
    fileUpload(filterObject.image).single("BrandImage"), // form -data 
    isValid(updateBrandSchema), // multer turn data to json because express do not support that
    // updateBrand
);
//delete Brand
router.delete(
    "/:brandId",
    isAuthenticated,
    isAuthorized("admin"),
    isValid(deleteBrandSchema), // multer turn data to json because express do not support that
    // deleteBrand
);
//get Brands
// router.get("/", allBrands)
export default router;
