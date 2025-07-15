import mongoose, { model, Schema, Types } from "mongoose";
//schema
export const categorySchema = new Schema({
    name: { type: String, required: true },  //Mobil Phone
    slug: { type: String, required: true, unique: true }, //mobil-phone  important for seo
    image: {
        url: { type: String, required: true },
        id: { type: String, required: true },
    },
    createdBy: { type: Types.ObjectId, required: true, ref: "User" },



},
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
categorySchema.virtual('subCategory', {
    ref: 'SubCategory',
    localField: '_id', // model
    foreignField: 'categoryId'  // model 
})

//model
export const Category = mongoose.models.Category|| model("Category", categorySchema)