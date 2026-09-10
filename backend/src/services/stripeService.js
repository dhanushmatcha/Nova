export const stripeService = {
  createCheckoutSession: async ({ userId, plan, billingCycle }) => {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return {
        success: false,
        message: 'Stripe credentials not configured. Billing placeholder active.'
      };
    }
    return {
      success: true,
      url: 'https://checkout.stripe.com/demo-session'
    };
  },
  createPortalSession: async ({ userId }) => {
    return {
      success: true,
      url: 'https://billing.stripe.com/demo-portal'
    };
  }
};
