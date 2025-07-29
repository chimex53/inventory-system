import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";  
import { formatFileSize } from "../utils/fileUpload.js";
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
        fileData = {
            filename: req.file.originalname,
            filePath: req.file.path,
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
