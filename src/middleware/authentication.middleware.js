import jwt from "jsonwebtoken";
import { catchError } from "../utils/catchError.js";
import { Token } from "../../DB/models/token.model.js";
import { User } from "../../DB/models/user.model.js";

export const isAuthenticated = catchError(async(req, res, next) => {
    // check if token is existence
    let token = req.headers["token"];
    if (!token || !token.startsWith(process.env.BEARER_TOKEN))
        return next(new Error("valid token is required"));
    //check payload
    token = token.split(process.env.BEARER_TOKEN)[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) return next(new Error("invalid token"));
    //check token in DB
    const tokenDB = await Token.findOne({ token, isValid: true });
    if (!tokenDB) return next(new Error("token expired"));
    //check user
    const user = await User.findOne({ email: decoded.email });
    if (!user) return (new Error("User not found"));
    //pass user
    req.user = user;
    //return next
    return next();
});