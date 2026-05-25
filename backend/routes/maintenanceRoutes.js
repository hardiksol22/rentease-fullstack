import express from 'express';
import { createTicket, updateTicketStatus } from '../controllers/maintenanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/request', protect, createTicket);
router.put('/:ticketId', protect, authorize('admin'), updateTicketStatus);

export default router;