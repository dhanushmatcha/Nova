import prisma from '../config/db.js';
import { newsletterSchema } from '../validators/index.js';

let memorySubscribers = [];

export const subscribeNewsletter = async (req, res, next) => {
  try {
    const validated = newsletterSchema.parse(req.body);
    const emailLower = validated.email.toLowerCase();

    let subscriber;
    if (prisma) {
      try {
        const existing = await prisma.newsletterSubscriber.findUnique({ where: { email: emailLower } });
        if (existing) {
          return res.status(200).json({ success: true, message: 'You are already subscribed to NOVA newsletter!' });
        }

        subscriber = await prisma.newsletterSubscriber.create({
          data: { email: emailLower }
        });
      } catch (e) {
        if (memorySubscribers.includes(emailLower)) {
          return res.status(200).json({ success: true, message: 'You are already subscribed to NOVA newsletter!' });
        }
        memorySubscribers.push(emailLower);
        subscriber = { id: `ns_${Date.now()}`, email: emailLower, createdAt: new Date().toISOString() };
      }
    } else {
      if (memorySubscribers.includes(emailLower)) {
        return res.status(200).json({ success: true, message: 'You are already subscribed to NOVA newsletter!' });
      }
      memorySubscribers.push(emailLower);
      subscriber = { id: `ns_${Date.now()}`, email: emailLower, createdAt: new Date().toISOString() };
    }

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed to NOVA updates!',
      data: subscriber
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};
