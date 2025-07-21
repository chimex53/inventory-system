import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// user id passed in the token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

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

  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    bio,
    photo,
  });

  // Generate Token 
  const token = generateToken(user._id);

  // Send HTTP-Only cookie 
  res.cookie("token", token, {
    path: "/", 
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true 
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

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  } 

  // User exists, check if password is correct 
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (user && passwordIsCorrect) { 
    // Generate Token and send cookie to frontend
    const token = generateToken(user._id);

    // Send HTTP-Only cookie 
   res.cookie("token", token, {
  path: "/", 
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 86400),
  sameSite: "lax",   // or "strict"
  secure: false      // For local development, set to false
});

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
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout user
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { 
    path: "/", 
    httpOnly: true,
    expires: new Date(0), // Set expiration date to the past
    sameSite: "none",
    secure: true 
  });
  return res.status(200).json({ message: "User logged out successfully" });
});

// Get user data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, phone, bio, photo } = user;
    res.status(200).json({
      _id,
      name,
      email, 
      phone,
      bio,
      photo 
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// loggedIn used status
const loginStatus =asyncHandler(async(req,res)=>{
   const token=req.cookies.token
   if(!token){
    return res.json(false)
   }

   // verify token 
    const verified = jwt.verify(token, process.env.JWT_SECRET)
   if(verified){
      return res.json(true)
   } else{
         return res.json(false) 
   }
 
})
export { registerUser,loginUser, logout, getUser,loginStatus};