import express from 'express';
import { createRental, getUserRentals } from '../controllers/rentalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createRental);
router.get('/my-rentals', protect, getUserRentals);

export default router;