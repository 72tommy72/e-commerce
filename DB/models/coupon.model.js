import mongoose, { model, Schema, Types } from "mongoose";
//schema
export const couponSchema = new Schema({
    name: { type: String, required: true },  //Mobil Phone
    discount: { type: Number, required: true, min: 1, max: 100 },
    expiredAt: Number,
    createdBy: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },



},
    { timestamps: true });

//model
export const Coupon = mongoose.models.Coupon || model("Coupon", couponSchema) 