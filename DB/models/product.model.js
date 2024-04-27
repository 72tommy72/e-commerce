

import mongoose, { model, Schema, Types } from "mongoose";

export const productSchema = new Schema({
    name: {
        type: String, required: true, min: 2, max: 20
    },
    description: String
    ,
    images: [{
        id : {type : String , required: true},
        url : {type : String , required: true},
    }],
    defaultImage: {
        id: { type: String, required: true },
        url: { type: String, required: true },
    },
    availableItems: { type: Number, min: 1, required: true },
    soldItems: { type: Number, default: 0 },
    price: { type: Number, required: true, min: 1 },
    discount: { type: Number, min: 1, max: 100 },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required : true,
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
    },
    subCategory: {
        type: Types.ObjectId,
        ref: 'SubCategory',
    }
    ,
    brand:{
        type: Types.ObjectId,
        ref: 'Brand',
    }


}, { timestamps: true ,strictQuery : true })

productSchema.virtual('finalPrice', function () {
    //this >>> document >>> product
    if (this.price)
    {
        return Number.parseFloat(
        this.price - (this.price * this.discount || 0) / 100
    ).toFixed(2);}
})

productSchema.query.paginate = function (page) {
    //pagination
    page = !page || page << 1 || isNaN(page)? 1 : page ;
    const limit = 2;
    skip = limit * (page - 1);
    // >> this >> query
    return this.skip(skip).limit(limit)
    // return query 

}

productSchema.query.customSelect = function (fields) {
    if (!fields) {
        return this;
    }
    //model keys
    const modelKeys = Object.keys(Product.schema.paths)
    //query keys
    const queriesKeys = fields.split('')
    //matchedKeys
    const matchedKeys = queriesKeys.filter((key) => modelKeys.includes(key))

    return this.select(matchedKeys);
}  
//model

export const Product = mongoose.model.Product || ('ProductSchema', productSchema )