import { Category } from "../../../DB/models/category.model.js";
import { SubCategory } from "../../../DB/models/sub.category.model.js";
import { catchError } from "../../utils/catchError.js";
import cloudinary from "../../utils/cloud.js";
import slugify from "slugify"

export const createSubCategory = catchError(async (req, res, next) => {
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
            folders: `${process.env.FOLDER_CLOUD_NAME}/subCategory`
        })
    //save in db
    const subCategory = await SubCategory.create({
        name: req.body.name,
        createdBy: req.user._id,
        image: { url: secure_url, id: public_id },
        slug: slugify(req.body.name),
        categoryId,

    })
    //send response
    return res.status(201).json({
        success: true,
        result: subCategory
    })

})
export const updateSubCategory = catchError(async (req, res, next) => {
    // check category
    const category = await SubCategory.findById(req.params.categoryId)
    if (!category) return next(new Error("category not found", { cause: 404 }))
    // check subCategory
    const subCategory = await SubCategory.findById(req.params.subCategoryId)
    if (!subCategory) return next(new Error("subCategory not found", { cause: 404 }))

    subCategory.name = req.body.name ? req.body.name : subCategory.name;
    subCategory.slug = req.body.name ? slugify(req.body.name) : subCategory.slug;

    //check file 
    if (req.file) {
        const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
            public_id: subCategory.image.id
        })
        subCategory.image.url = secure_url;
    }
    await subCategory.save();
    //send response
    return res.status(201).json({
        success: "updated  successfully",
        result: subCategory
    })
})
export const deleteSubCategory = catchError(async (req, res, next) => {
    // check category
    const category = await SubCategory.findById(req.params.categoryId)
    if (!category) return next(new Error("category not found", { cause: 404 }))
    // check subCategory and delete
    const subCategory = await SubCategory.findByIdAndDelete(req.params.subCategoryId)
    if (!subCategory) return next(new Error("subCategory not found", { cause: 404 }))
    //send response
    return res.status(201).json({
        success: "deleted  successfully",
    })
})
export const allSubCategories = catchError(async (req, res, next) => {
    // check category
    const subCategories = await SubCategory.find().populate("categoryId");
    return res.status(200).json({
        success: true,
        result : subCategories
    })
    
})

