import mongoose from "mongoose";
import { catchError } from "../src/utils/catchError.js";

/**
 * Establishes connection to MongoDB database
 * Uses environment variable for connection string
 * Wrapped in error handling middleware
 */
export const connectDB = catchError(async () => {
  try {
    await mongoose.connect(process.env.CONNECTED_WITH_DB);
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error; // Re-throw to be handled by catchError middleware
  }
});
