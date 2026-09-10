import { stripeService } from '../services/stripeService.js';

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { plan, billingCycle } = req.body;
    const userId = req.user?.id;
    const result = await stripeService.createCheckoutSession({ userId, plan, billingCycle });
    
    if (!result.success) {
      return res.status(400).json(result);
    }
    
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const createPortalSession = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const result = await stripeService.createPortalSession({ userId });
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req, res, next) => {
  try {
    // Webhook endpoint placeholder for Stripe events
    res.json({ received: true });
  } catch (error) {
    next(error);
  }
};
