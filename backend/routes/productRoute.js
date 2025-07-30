import express from 'express';
import { createProduct } from '../controllers/productController.js';
import { upload } from '../utils/fileUpload.js';
import protect from '../middleWare/authMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), createProduct);

export default router;
