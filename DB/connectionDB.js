import mongoose from "mongoose";
import { catchError } from "../src/utils/catchError.js";

export const connectDB = catchError(async (req, res, next) => {
    return await mongoose.connect(process.env.CONNECTED_WITH_DB)
        .then(() => { console.log("connection with DB is success ") })
        .catch((err) => { console.log("connection with DB is Field ", err)} )
})