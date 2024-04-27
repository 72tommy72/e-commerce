import { catchError } from "../../utils/catchError.js";
import { Product } from "../../../DB/models/product.model.js";
import { Category } from "../../../DB/models/category.model.js";
import { nanoid } from 'nanoid'
import cloudinary from "../../utils/cloud.js";

export const createProduct = catchError(async (req, res, next) => {
    //data
    // const {
    //     name,
    //     description,
    //     availableItems,
    //     price,
    //     discount,
    //     category,
    //     subCategory,
    //     brand }= req.body
    //file
    if (!req.file) return next((new Error("product Images is required", { cause: 400 })));
    //create unique name
    const cloudFolder = nanoid();
    let images = [];
    //upload images
    for (const file of req.files.subImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            file.path, { folder: `${process.env.FOLDER_CLOUD_NAME}/Products/${cloudFolder}` }
        );
        images.push({ id: public_id, url: secure_url })
    }
    //upload default image
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.files.defaultImage[0].path,
        { folder: `${process.env.FOLDER_CLOUD_NAME}/Products/${cloudFolder}` }
    );

    //save in db
    const product = await Product.create({
        ...req.body,
        cloudFolder,
        createBy: req.user,
        defaultImage: { url: secure_url, id: public_id },

    })

    //send response
    return res.status(201).json({
        success: true,
        result: product
    })

})
export const deleteProduct = catchError(async (req, res, next) => {
    //check product
    const product = await Product.findById(req.params.productId);
    if (!product) return next((new Error("product is not found", { cause: 400 })));
    //check owner
    if (req.user._id.toString() != product.createdBy.toString()) return next((new Error("not authorized", { cause: 400 })));

    const imagesArr = product.images
    const ids = imagesArr.map((imageObj) => imageObj.id)
    ids.push(product.defaultImage.id)

    //delete images
    const result = await cloudinary.api.delete_resources(ids)

    //delete folder
    await cloudinary.api.delete_folder(`${process.env.FOLDER_CLOUD_NAME}/Products/${cloudFolder}`)

    //delete folder from db
    await Product.findByIdAndDelete(req.params.productId)

    //send response
    return res.status(201).json({
        success: true,
        result: 'product deleted successfully'
    })

})
export const allProducts = catchError(async (req, res, next) => {
    if (req.params.categoryId) {
        const category = await Category.findById(req.params.categoryId)
        if (!category) return next(new Error('Category Not Found', { statusCode: 404 }))
        const allProducts = await Product.find({ category: req.params.categoryId })
        return res.json({
            success: true,
            products: allProducts
        })
    }
    //search
    // const products = await Product.find({ $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { description: { $regex: req.query.keyword, $options: 'i' }}]});

    //pagination

    const products = await Product.find({ ...req.query })
        .paginate(req.query.page)
        .customSelect(req.query.fields)
        .sort(req.query.sort);
        
    
    //select
    
    // const { fields } = req.query;
    // //model keys
    // const modelKeys = Object.keys(Product.schema.paths)
    // //query keys
    // const queriesKeys = fields.split('')
    // //matchedKeys
    // const matchedKeys = queriesKeys.filter((key) => modelKeys.includes(key))

    // const products = await Product.find({}).select(matchedKeys);

    //sort 
    // const { sort } = req.query;
    // const products = await Product.find({}).sort(sort);

    //*********** filter  *****************//
    // const products = await Product.find({ ...req.query });


    //response
    return res.json({
        success: true,
        message : products
    })
})

export const singleProduct = catchError(async (req, res, next) => {
    const product = await Product.findById(req.params.productId); 
    if (!product) return next(new Error('Product not found', {cause : 404}));
    return res.json({
        success: true,
        message: product
    })
})