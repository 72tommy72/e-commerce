import mongoose, { model, Schema } from "mongoose";

//schema
export const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    isLogged: {
        type: Boolean,
        default: false,
    },
    profileImage: {
        url: {
            type: String,
            default: "https://res.cloudinary.com/dulsrsc7l/image/upload/v1708529706/l60Hf_flogsg.png"
        },
        id: {
            type: String,
            default: "l60Hf_flogsg"
        },
    },
    // coverImg: [{
    //     url: { type: String, require: true },
    //     id: { type: String, require: true }
    // }],
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default : 'user'
            
    },
    phone: String,
    forgetCode: String,
    activationCode: String,
    


}, { timestamp: true })

//model
export const User = mongoose.models.User || model("User", userSchema)