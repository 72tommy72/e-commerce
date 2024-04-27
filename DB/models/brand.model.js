import mongoose, { model, Schema, Types } from "mongoose";
//schema
export const brandSchema = new Schema({
    name: { type: String, required: true },  //Mobil Phone
    slug: { type: String, required: true, unique: true }, //mobil-phone  important for seo
    image: {
        url: { type: String, required: true },
        id: { type: String, required: true },
    },
    brandId: {
        type: Types.ObjectId,
        ref: "Category",
        
    },
    createdBy: { type: Types.ObjectId, required: true, ref: "User" },



},
    { timestamps: true });

//model
export const Brand = mongoose.models.Brand || model("Brand", brandSchema) 