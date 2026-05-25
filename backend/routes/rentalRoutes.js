import express from 'express';
import { createRental, getUserRentals } from '../controllers/rentalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/checkout', createRental);
router.get('/active', getUserRentals);

export default router;