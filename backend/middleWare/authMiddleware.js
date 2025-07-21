import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async(req,res,next)=>{
    try {

         const token = req.cookies.token
const authHeader = req.headers.authorization
const tokenFromHeader = authHeader && authHeader.split(" ")[1];

         console.log("tokenFromHeader", tokenFromHeader)
         console.log("Token:", token);
         if(!token ){
        res.status(401)
        throw new Error("Not authorized please login hgf")
         }

         console.log("About to verify")
         // verify token 
         const verified = jwt.verify(token, process.env.JWT_SECRET)

         console.log("Token verified:", verified);

         const userId = verified.id;
         // get user id from token
  const user= await User.findById(userId).select("-password")
    if(!user){
         res.status(401)
        throw new Error("user not found")
    }
    req.user=user
    next()
    } catch (error) {
         res.status(401)
        throw new Error(" Not authorized please login")
    }
})

export default protect