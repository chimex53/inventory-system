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
            fileSize: formatFileSize(req.file.size), // Format file size
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

 // get all products
 const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user._id }).sort("-createdAT");
    res.status(200).json(products);
 });

 // get a single product

const getProduct= asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("product not found");
    }
    
    if (product.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("user not authorized");
    }
    res.status(200).json(product);
});

// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("product not found");
    }
    
    // match user with product
    if (product.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("user not authorized");
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product removed" });
});

//update product 
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, sku, quantity } = req.body;
     
    const product= await Product.findById(req.params.id)
     if (!product) {
        res.status(404);
        throw new Error("product not found");
    }

    // match user with product
    if (product.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("user not authorized");
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
        } catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded")
        }
        fileData = {
            filename: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: formatFileSize(req.file.size), // Format file size
        }; 
    }

    //updated product

   const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
        user: req.user._id,
        name,
        price,
        description,
        category,
        sku,
        quantity,
        image: Object.keys(fileData).length > 0 ? fileData : product.image,  // Include image data if present, otherwise keep existing image
    },
    {
        new: true,         // return the updated document
        runValidators: true, // run validators on the updated document
    }
);
    // Send response 
    res.status(200).json(updatedProduct);
});
export { createProduct, getProducts,getProduct, deleteProduct,updateProduct};
 