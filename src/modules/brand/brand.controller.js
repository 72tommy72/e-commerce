import { Brand } from "../../../DB/models/brand.model.js";
import { catchError } from "../../utils/catchError.js";
import cloudinary from "../../utils/cloud.js";
import slugify from "slugify";

export const createBrand = catchError(async (req, res, next) => {
    const { name, categoryId } = req.body;

    if (await Brand.findOne({ name })) {
        return next(new Error(`duplicate brand name ${name}`, { cause: 409 }));
    }
    //check file
    if (!req.file) return next(new Error("image is required: ", { cause: 400 }));
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
            folder: `${process.env.FOLDER_CLOUD_NAME}/Brand`,
        }
    );
    const brand = await Brand.create({
        name,
        categoryId,
        image: { secure_url, public_id },
        createdBy: req.user._id,
        updatedBy: req.user._id,
    });
    //send response
    return res.status(201).json({
        success: true,
        result: brand,
    });
});
export const updateBrand = catchError(async (req, res, next) => {
    const brandId = req.params.brandId;
    const brand = await Brand.findById(brandId);

    if (!brand) {
        return next(new Error(`Invalid brand ${brandId}`), { cause: 409 });
    }

    if (req.body.name) {
        if (brand.name == req.body.name) {
            return next(new Error(`old name matches new name`), { cause: 400 });
        }
        if (await Brand.findOne({ name: req.body.name })) {
            return next(new Error(`duplicate brand name`), { cause: 409 });
        }
        brand.name = req.body.name;
        brand.slug = slugify(req.body.name);
    }

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: `${process.env.FOLDER_CLOUD_NAME}/Brand`,
            }
        );

        await cloudinary.uploader.destroy(brand.image.public_id);
        brand.image = { secure_url, public_id };
    }

    await brand.save();
    //send response
    return res.status(201).json({
        success: "updated  successfully",
        result: brand,
    });
});
export const deleteBrand = catchError(async (req, res, next) => {
    const brandId = req.params.brandId;

    const deletedBrand = await Brand.findByIdAndDelete(brandId);

    if (!deletedBrand) {
        return next(new Error(`Brand with ID ${brandId} not found`), {
            cause: 404,
        });
    }
    //send response
    return res.status(201).json({
        success: "deleted  successfully",
    });
});
export const allBrands = catchError(async (req, res, next) => {
    // check category
    const brands = await Brand.find();

    return res.status(200).json({
        message: "success",
        brands
    });
});
