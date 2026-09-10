import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  company: z.string().optional(),
  jobTitle: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  avatar: z.string().optional()
});

export const createProjectSchema = z.object({
  workspaceId: z.string().uuid().optional(),
  name: z.string().min(2, 'Project name must be at least 2 characters'),
  description: z.string().optional(),
  status: z.enum(['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().optional()
});

export const updateProjectSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  status: z.enum(['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().optional()
});

export const createTaskSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(2, 'Task title is required'),
  description: z.string().optional(),
  assignedToId: z.string().uuid().optional().nullable(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().optional()
});

export const updateTaskSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  assignedToId: z.string().uuid().optional().nullable(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().optional()
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters')
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address')
});

export const aiChatSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  context: z.string().optional()
});
