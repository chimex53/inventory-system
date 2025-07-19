import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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

// login user
const loginUser =asyncHandler(async(req,res)=>{
const {email, password}=req.body

// validate Requset
if(!email || !password){
  res.status(400)
 throw new Error("please add email and password")
}

// check if user exist
 const user =await User.findOne({email})
 if(!user){
  res.status(400)
 throw new Error("user not found, please signup")
} 

// user exist, check if password is correct 

const passwordIsCorrect= await bcrypt.compare(password,user.password);
  // generete Token and send cookie to frontend
  const token =generateToken(user._id)

  //send HTTP- Only cookie 
res.cookie("token",token, { 
  path:"/", 
  httpOnly: true,
  expires:new Date(Date.now() + 1000 *86400),
  sameSite:"none",
  secure:true 
});

if(user && passwordIsCorrect){ 
   const { _id, name, email, phone, bio, photo } = user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      bio, 
      photo,
      token
    });
    
} else{
  res.status(400);
  throw new Error("Invalid email or password");
}
})
export { registerUser,loginUser  };
