import mongoose, { model, Schema, Types } from "mongoose";

const cartSchema = new Schema(
    {
        userId: { type: Types.ObjectId, required: true, ref: "User" },
        products: [
            {
                productId: {
                    type: Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        subTotal: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true , toJSON:{virtuals : true} ,strictQuery : true  }
);
cartSchema.virtual('finalPrice', function () {
    //this >>> document >>> product
    return Number.parseFloat(
        this.price - (this.price * this.discount || 0) / 100
    ).toFixed(2);
})
//model
export const Cart = mongoose.models.Cart || model("Cart", cartSchema);
