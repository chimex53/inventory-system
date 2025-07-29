import express from 'express';
import { createProduct } from '../controllers/productController.js';
import { upload } from '../utils/fileUpload.js';

const router = express.Router();

router.post('/', upload.single('image'), createProduct);

export default router;
