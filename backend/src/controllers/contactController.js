import prisma from '../config/db.js';
import { contactSchema } from '../validators/index.js';

let memoryContactMessages = [];

export const submitContact = async (req, res, next) => {
  try {
    const validated = contactSchema.parse(req.body);

    let contactRecord;
    if (prisma) {
      try {
        contactRecord = await prisma.contactMessage.create({
          data: {
            name: validated.name,
            email: validated.email.toLowerCase(),
            company: validated.company || null,
            message: validated.message
          }
        });
      } catch (e) {
        contactRecord = { id: `c_${Date.now()}`, ...validated, createdAt: new Date().toISOString() };
        memoryContactMessages.push(contactRecord);
      }
    } else {
      contactRecord = { id: `c_${Date.now()}`, ...validated, createdAt: new Date().toISOString() };
      memoryContactMessages.push(contactRecord);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your sales inquiry has been received.',
      data: contactRecord
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};
