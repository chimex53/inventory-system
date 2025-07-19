import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
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
    /* maxlength: [23, "Password must not be more than 23 characters"], */
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
    trim: true,
    default:
      "https://iconarchive.com/download/i107272/Flat-UI-Icons/User-Interface/user.ico",
  },
 phone: {
  type: String,
  unique: true,
  sparse: true,
  trim: true,
  validate: {
    validator: function(v) {
      // Only validate if phone is provided (not null/undefined/empty)
      if (!v) return true;
      return /^\+\d{10,15}$/.test(v);
    },
    message: "Please enter a valid phone number with leading + and 10-15 digits"
  },
},

bio: {
  type: String,
  trim: true,
  maxlength: [250, "Bio must not be more than 250 characters"],
  default: "bio goes here"
},

}, {
  timestamps: true,
  versionKey: false,
}); 

  //Encrypt password before saving to DB
  userSchema.pre("save", async function(next){
 if(!this.isModified("password")){
  return next()
 }
//Hash password 
 const salt= await bcrypt.genSalt(10)
  const hashedPassword =await bcrypt.hash(this.password,salt)
    this.password=hashedPassword
  next()
  })
const User = mongoose.model('User', userSchema);

export default User;
