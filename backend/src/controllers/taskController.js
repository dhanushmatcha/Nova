import prisma from '../config/db.js';
import { createTaskSchema, updateTaskSchema } from '../validators/index.js';

let memoryTasks = [
  {
    id: 'task-101',
    projectId: 'proj-1',
    assignedToId: 'demo-user-id-123',
    title: 'Auto-summarize customer feedback from Intercom & Slack',
    description: 'Process incoming support feedback and classify feature requests.',
    status: 'DONE',
    priority: 'HIGH',
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-102',
    projectId: 'proj-1',
    assignedToId: 'demo-user-id-123',
    title: 'Generate Figma UI component specifications & API stubs',
    description: 'Create frontend type definitions and mock API response schema.',
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    dueDate: new Date(Date.now() + 172800000).toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-103',
    projectId: 'proj-1',
    assignedToId: null,
    title: 'Schedule release sync & assign reviewer based on git blame',
    description: 'Setup automated GitHub webhook trigger for PR reviews.',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: new Date(Date.now() + 432000000).toISOString(),
    createdAt: new Date().toISOString()
  }
];

export const getTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    let tasks = [];

    if (prisma) {
      try {
        const whereClause = projectId ? { projectId } : {};
        tasks = await prisma.task.findMany({
          where: whereClause,
          orderBy: { createdAt: 'desc' },
          include: { assignedTo: { select: { id: true, name: true, email: true, avatar: true } } }
        });
      } catch (e) {
        tasks = projectId ? memoryTasks.filter(t => t.projectId === projectId) : memoryTasks;
      }
    } else {
      tasks = projectId ? memoryTasks.filter(t => t.projectId === projectId) : memoryTasks;
    }

    return res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.body.projectId;
    const validated = createTaskSchema.parse({ ...req.body, projectId });

    let task;
    if (prisma) {
      try {
        task = await prisma.task.create({
          data: {
            projectId: validated.projectId,
            assignedToId: validated.assignedToId || null,
            title: validated.title,
            description: validated.description || '',
            status: validated.status || 'TODO',
            priority: validated.priority || 'MEDIUM',
            dueDate: validated.dueDate ? new Date(validated.dueDate) : null
          }
        });
      } catch (e) {
        task = {
          id: `task_${Date.now()}`,
          projectId: validated.projectId,
          assignedToId: validated.assignedToId || null,
          title: validated.title,
          description: validated.description || '',
          status: validated.status || 'TODO',
          priority: validated.priority || 'MEDIUM',
          dueDate: validated.dueDate || null,
          createdAt: new Date().toISOString()
        };
        memoryTasks.unshift(task);
      }
    } else {
      task = {
        id: `task_${Date.now()}`,
        projectId: validated.projectId,
        assignedToId: validated.assignedToId || null,
        title: validated.title,
        description: validated.description || '',
        status: validated.status || 'TODO',
        priority: validated.priority || 'MEDIUM',
        dueDate: validated.dueDate || null,
        createdAt: new Date().toISOString()
      };
      memoryTasks.unshift(task);
    }

    return res.status(201).json({
      success: true,
      message: 'Task created successfully.',
      data: task
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = updateTaskSchema.parse(req.body);

    let updated;
    if (prisma) {
      try {
        updated = await prisma.task.update({
          where: { id },
          data: {
            ...validated,
            dueDate: validated.dueDate ? new Date(validated.dueDate) : undefined
          }
        });
      } catch (e) {
        const index = memoryTasks.findIndex(t => t.id === id);
        if (index !== -1) {
          memoryTasks[index] = { ...memoryTasks[index], ...validated };
          updated = memoryTasks[index];
        }
      }
    } else {
      const index = memoryTasks.findIndex(t => t.id === id);
      if (index !== -1) {
        memoryTasks[index] = { ...memoryTasks[index], ...validated };
        updated = memoryTasks[index];
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Task not found for update.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully.',
      data: updated
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (prisma) {
      try {
        await prisma.task.delete({ where: { id } });
      } catch (e) {
        memoryTasks = memoryTasks.filter(t => t.id !== id);
      }
    } else {
      memoryTasks = memoryTasks.filter(t => t.id !== id);
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
