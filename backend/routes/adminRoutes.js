import express from 'express';
import { getDashboardKPIs } from '../controllers/adminController.js';
// FIXED: Changed '= require(...)' to proper 'from' syntax
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, authorize('admin'), getDashboardKPIs);

export default router;