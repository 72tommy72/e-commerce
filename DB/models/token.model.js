import mongoose, { model, Schema, Types } from "mongoose";

/**
 * Token Schema Definition
 * Represents the structure for storing authentication tokens
 */
const tokenSchema = new Schema({
    // The actual token string
    token: {
        type: String,
        required: true
    },

    // Reference to the associated user
    user: {
        type: Types.ObjectId,
        ref: "User"
    },

    // Token validity status
    isValid: {
        type: Boolean,
        default: true
    },

    // Device/browser information
    agent: {
        type: String,
        required: false
    },

    // Token expiration timestamp
    expiredAt: {
        type: String,
        required: false
    }
}, { 
    timestamps: true // Automatically manage createdAt and updatedAt
});

// Export the Token model, creating it if it doesn't exist
export const Token = mongoose.models.Token || model("Token", tokenSchema);
