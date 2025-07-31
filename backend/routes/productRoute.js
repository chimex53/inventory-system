import express from 'express';
import { createProduct,getProducts,getProduct,deleteProduct,    updateProduct  } from '../controllers/productController.js';
import { upload } from '../utils/fileUpload.js';
import protect from '../middleWare/authMiddleware.js';

const router = express.Router();

// Product Routes
router.post('/', protect, upload.single('image'), createProduct);
router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.delete('/:id', protect, deleteProduct);
router.patch('/:id', protect, upload.single('image'), updateProduct);
export default router;
