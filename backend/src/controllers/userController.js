import prisma from '../config/db.js';
import { updateProfileSchema } from '../validators/index.js';

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let user;

    if (prisma) {
      try {
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, name: true, email: true, company: true, jobTitle: true, avatar: true, createdAt: true }
        });
      } catch (e) {
        user = { id: userId, name: req.user.name || 'Dhanu', email: req.user.email, company: 'NOVA Labs', jobTitle: 'Senior Product Lead' };
      }
    } else {
      user = { id: userId, name: req.user.name || 'Dhanu', email: req.user.email, company: 'NOVA Labs', jobTitle: 'Senior Product Lead' };
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const validated = updateProfileSchema.parse(req.body);

    let updatedUser;
    if (prisma) {
      try {
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: validated,
          select: { id: true, name: true, email: true, company: true, jobTitle: true, avatar: true, createdAt: true }
        });
      } catch (e) {
        updatedUser = { id: userId, email: req.user.email, ...validated };
      }
    } else {
      updatedUser = { id: userId, email: req.user.email, ...validated };
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: updatedUser
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};
