import { Category } from "../../../DB/models/category.model.js";
import { catchError } from "../../utils/catchError.js";
import cloudinary from "../../utils/cloud.js";
import slugify from "slugify"

export const createCategory = catchError(async (req, res, next) => {

    //file
    if (!req.file) return next((new Error("category Image is required")));

    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path, { folder: `${process.env.FOLDER_CLOUD_NAME}/category` }
    );
    //save in db
    const category = await Category.create({
        name: req.body.name,
        createdBy: req.user._id,
        image: { url: secure_url, id: public_id },
        slug: slugify(req.body.name)

    })

    //send response
    return res.status(201).json({
        success: true,
        result : category
    })

})

export const updateCategory = catchError(async (req, res, next) => {
    //check category
    const category = await Category.findById(req.params.categoryId);
    if (!category) return next(new Error("Category not found"))
    //name
    category.name = req.body.name ? req.body.name : category.name
    //slug
    category.slug = req.body.name ? req.body.slugify(req.body.name) : category.slug;
    //files
    if (req.file) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path,
            {
                public_id: category.image.id
            })
        category.image.url = secure_url;
    }
    //save category
    await category.save()
    //send response
    return res.status(201).json({
        success: true,
    })
})

export const deleteCategory = catchError(async (req, res, next) => {
    //check category
    const category = await Category.findById(req.params.categoryId)
    if (!category) return next(new Error('category not found'));
    
    //delete image from cloudinary
    const result = await cloudinary.uploader.destroy(category.public_id)
    //delete category
    await category.remove();

    //response
    return res.status(201).json({
        success: true,
        result: "category deleted successfully"
    })
})

export const allCategories = catchError(async (req, res, next) => {
    const categories = await Category.find().populate({
        path: "subCategory",
        select : "name"
    });

    //response
    return res.status(201).json({
        success: true,
        result: categories
    })
})
