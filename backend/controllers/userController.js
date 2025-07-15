import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, bio, phone } = req.body; // include bio and phone

  // validation
  if (!name || !email || !password ) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters');
  }

  // check if user email already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(409); // 409 Conflict is more appropriate
    throw new Error('Email already exists');
  }

  // create new user
  const user = await User.create({
    name,
    email,
    password,
    bio,
    phone,
  });

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
export default registerUser;