import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const generateToken =(id)=>{
 return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"1d"}) 
}
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, bio, photo } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email, and password');
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  
  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    bio,
    photo,
  
  });

  // generete Token 
  const token =generateToken(user._id)

  //send HTTP- Only cookie 
res.cookie("token",token, {
  path:"/", 
  httpOnly: true,
  expires:new Date(Date.now() + 1000 *86400),
  sameSite:"none",
  secure:true 
});
  if (user) {
    const { _id, name, email, phone, bio, photo } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
       token
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export { registerUser };
