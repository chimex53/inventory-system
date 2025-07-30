import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";  
import { formatFileSize } from "../utils/fileUpload.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, sku, quantity } = req.body;

    // Check if all required fields are provided
    if (!name || !price || !description || !category || !sku || !quantity) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Handle image upload
    let fileData = {};
    if (req.file) {  
        // save image to cloudinary
        let uploadedFile;
        try {
            // Convert file to base64
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            
            uploadedFile = await cloudinary.uploader.upload(dataURI, {
                folder: "inventory_system",
                resource_type: "auto"
            });
            console.log("Cloudinary upload response:", uploadedFile);
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            res.status(500);
            throw new Error("Image could not be uploaded")
        }
        fileData = {
            filename: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: formatFileSize(req.file.size,2), // Format file size
        }; 
    }

    // Create a new product including image data if present
    const product = await Product.create({
        user: req.user._id,
        name,
        price,
        description,
        category,
        sku,
        quantity,
        image: fileData,  
    });

    // Send response 
    res.status(201).json(product);
});

export { createProduct };
