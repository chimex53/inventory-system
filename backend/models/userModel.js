import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String, // Capitalized String
    required: [true, "Please add a Name"],
  },
  email: {
    type: String,
    required: [true, "Please add Email"],
    unique: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a Password"],
    minlength: [8, "Password must be at least 8 characters"],
    maxlength: [23, "Password must not be more than 23 characters"],
    validate: {
      validator: function (v) {
        // Password must contain at least one uppercase letter, one number, and one special character
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(v);
      },
      message:
        "Password must contain at least one uppercase letter, one number, and one special character",
    },
  },
  photo: {
    type: String,
    required: [true, "Please add a Photo"],
    trim: true,
    default:
      "https://iconarchive.com/download/i107272/Flat-UI-Icons/User-Interface/user.ico",
  },
  phone: {
    type: String,
    required: [true, "Please add a Phone Number"],
    unique: true,
    trim: true,
    match: [/^\d{10}$/, "Please enter a valid phone number"],
  },
  bio: {
    type: String,
    required: [true, "Please add a Bio"],
    trim: true,
    maxlength: [250, "Bio must not be more than 250 characters"],
  },
}, {
  timestamps: true,
  versionKey: false,
});

const User = mongoose.model("User", userSchema);

export default User;
