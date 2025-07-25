import mongoose from "mongoose";

const tokenSchema =  mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
         required: true,
    },
    token:{
        type: String
    },
    createAt:{
        type: Date,
         required: true,
    },
    expiresAt:{
        type: Date,
         required: true,
    }  
 
})

const Token = mongoose.model("Token", tokenSchema)

export  default Token
 