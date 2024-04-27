import mongoose, { model, Schema, Types } from "mongoose";

export const subCategorySchema = Schema({
    name: { type: String, required: true, min: 3, max: 10 },
    slug: { type: String, required: true },
    image: {
        id: { type: String, required: true },
        url: { type: String, required: true }
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category",
        required: true,
    },
    brand: {
        type: Types.ObjectId,
        ref: "Brand",
    },
    createdBy: { type: Types.ObjectId, required: true, ref: "User" },

},
    { timestamps: true });

    
//model
export const SubCategory = mongoose.models.SubCategory || model("SubCategory", subCategorySchema)