import mongoose from "mongoose";
import { catchError } from "../src/utils/catchError.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTED_WITH_DB);
        console.log("✅ Database connection established");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        throw error;
    }
};
