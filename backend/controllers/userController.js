import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register user controller
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, bio, phone } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters');
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(409);
    throw new Error('Email already exists');
  }

  const user = await User.create({ name, email, password, bio, phone });

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;

    // Token generation commented out intentionally:
    // const token = generateToken(user._id);

    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      // token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login user controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const { _id, name, email, photo, phone, bio } = user;

    res.json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export { registerUser, loginUser };
