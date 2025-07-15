import mongoose, { model, Schema, Types } from "mongoose";

export const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products:
        [{
        _id : false,
        productId: { type: Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, min: 1 },
        name: String,
        itemPrice : Number,
        totalPrice : Number,
        }],
    invoice: {id : String , url : String},
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['placed', 'shipped', 'canceled', 'delivered', 'refunded'],
        default: 'placed'
    },
    payment: {
        type: String,
        enum: ['visa', 'cash'],
        default: 'placed'
    },
    coupon: {
        id: { type: Types.ObjectId, ref: 'Coupon' },
        name: String,
        discount: { type: Number, min: 1, max: 100 }
    }

}, { timestamps: true, toJSON: { virtuals: true }, strictQuery: true });
orderSchema.virtual('finalPrice', function () {
    return this.coupon ?
        Number.parseFloat(
            this.price - (this.price * this.coupon.discount) / 100
        ).toFixed(2) : this.price
    
})
export const OrderModel = mongoose.models.OrderModel || model('Order', orderSchema);