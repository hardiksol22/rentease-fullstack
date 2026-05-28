import express from 'express';
import { handleChatMessage } from '../controllers/chatController.js';

const router = express.Router();

// ⚡ Strictly listening to POST requests on /api/chat
router.post('/', handleChatMessage);

export default router;