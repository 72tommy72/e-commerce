import { Category } from "../../../DB/models/category.model.js";
import { Brand } from "../../../DB/models/sub.category.model.js";
import { catchError } from "../../utils/catchError.js";
import cloudinary from "../../utils/cloud.js";
import slugify from "slugify"

export const createBrand = catchError(async (req, res, next) => {
    //data  
    const { categoryId } = req.params;
    //check file
    if (!req.file) return next(new Error("image is required: ", { cause: 400 }));
    //check categoryId
    const category = await Category.findById(categoryId);
    if (!category) return next(new Error("category not found: ", { cause: 404 }));
    //upload file
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path,
        {
            folders: `${process.env.FOLDER_CLOUD_NAME}/brand`
        })
    //save in db
    const brand = await Brand.create({
        name: req.body.name,
        createdBy: req.user._id,
        image: { url: secure_url, id: public_id },
        slug: slugify(req.body.name),
        categoryId,

    })
    //send response
    return res.status(201).json({
        success: true,
        result: brand
    })

})
export const updateBrand = catchError(async (req, res, next) => {
    // check category
    const category = await Brand.findById(req.params.categoryId)
    if (!category) return next(new Error("category not found", { cause: 404 }))
    // check Brand
    const brand = await Brand.findById(req.params.brandId)
    if (!brand) return next(new Error("brand not found", { cause: 404 }))

    brand.name = req.body.name ? req.body.name : brand.name;
    brand.slug = req.body.name ? slugify(req.body.name) : brand.slug;

    //check file 
    if (req.file) {
        const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
            public_id: brand.image.id
        })
        brand.image.url = secure_url;
    }
    await brand.save();
    //send response
    return res.status(201).json({
        success: "updated  successfully",
        result: brand
    })
})
export const deleteBrand = catchError(async (req, res, next) => {
    // check category
    const category = await Brand.findById(req.params.categoryId)
    if (!category) return next(new Error("category not found", { cause: 404 }))
    // check brand and delete
    const brand = await Brand.findByIdAndDelete(req.params.brandId)
    if (!brand) return next(new Error("brand not found", { cause: 404 }))
    //send response
    return res.status(201).json({
        success: "deleted  successfully",
    })
})
export const allSubCategories = catchError(async (req, res, next) => {
    // check category
    const subCategories = await Brand.find().populate("categoryId");
    return res.status(200).json({
        success: true,
        result: subCategories
    })

})

