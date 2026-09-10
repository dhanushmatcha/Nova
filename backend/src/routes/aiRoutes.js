import { Router } from 'express';
import { chat } from '../controllers/aiController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/chat', authMiddleware, chat);

export default router;
