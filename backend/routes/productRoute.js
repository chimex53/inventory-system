import express from 'express';
import { createProduct,getProducts, getProduct } from '../controllers/productController.js';
import { upload } from '../utils/fileUpload.js';
import protect from '../middleWare/authMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), createProduct);
router.get('/', protect,  getProducts);
router.get('/:id', protect,  getProduct);

export default router;
 