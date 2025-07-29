import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies.token;
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader && authHeader.split(" ")[1];
        
        // Use either cookie token or header token
        const finalToken = token || tokenFromHeader;

        if(!finalToken){
            res.status(401);
            throw new Error("Not authorized, please login");
        }

        // Verify token
        const verified = jwt.verify(finalToken, process.env.JWT_SECRET);
        
        // Get user from token
        const user = await User.findById(verified.id).select("-password");
        if(!user){
            res.status(401);
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, please login");
    }
});

export default protect;