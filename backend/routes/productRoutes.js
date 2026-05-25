import express from 'express';
// FIXED: Removed the accidental '=' before 'from'
import { getProducts, createProduct } from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, authorize('admin', 'vendor'), createProduct);

export default router;