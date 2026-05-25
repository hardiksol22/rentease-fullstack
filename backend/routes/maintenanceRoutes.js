import express from 'express';
import { raiseTicket, getUserTickets } from '../controllers/maintenanceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Enforcing global JWT guard layout across both support parameters
router.post('/', protect, raiseTicket);
router.get('/my-tickets', protect, getUserTickets);

export default router;