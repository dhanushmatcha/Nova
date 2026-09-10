import { Router } from 'express';
import { createCheckoutSession, createPortalSession, handleWebhook } from '../controllers/billingController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create-checkout-session', authenticateToken, createCheckoutSession);
router.post('/create-portal-session', authenticateToken, createPortalSession);
router.post('/webhook', handleWebhook);

export default router;
