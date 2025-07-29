
import mongoose from "mongoose";

const productSchema =  mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    requred: true,
    ref: "User" 
   },
   name:{
    type: String,
    required: [true, "plese add a name"],
    trim: true
   },
   sku:{
    type: String,
    required: true,
    default: "sku"
   },
   category:{
    type: String,
    required: [true, "please add a category"],
    trim: true
   },
   quantity:{
    type: String,
    required: [true, "please add a quantity"],
    trim: true
   },
   price:{
    type: String,
    required: [true, "please add a price"],
    trim: true
   },
   description:{
    type: String,
    required: [true, "please add a description"],
    trim: true
   },
   image:{
    type: Object,
    default: {},
    trim: true
   },

 
}, {
    timestamps:true,
})

const product= mongoose.model("Product", productSchema)

export  default product
 