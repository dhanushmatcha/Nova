import prisma from '../config/db.js';
import { createProjectSchema, updateProjectSchema } from '../validators/index.js';

let memoryProjects = [
  {
    id: 'proj-1',
    workspaceId: 'demo-ws-1',
    name: 'AI Copilot Engine v2.4',
    description: 'Upgrade natural language context parser and sprint summary generation.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: new Date(Date.now() + 864000000).toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-2',
    workspaceId: 'demo-ws-1',
    name: 'SOC-2 Compliance Security Audit',
    description: 'Enterprise data retention policies and encryption audit.',
    status: 'COMPLETED',
    priority: 'URGENT',
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-3',
    workspaceId: 'demo-ws-1',
    name: 'Marketing Multi-Channel Launch',
    description: 'Automated content calendar sync across Slack and Figma.',
    status: 'PLANNING',
    priority: 'MEDIUM',
    dueDate: new Date(Date.now() + 1400000000).toISOString(),
    createdAt: new Date().toISOString()
  }
];

export const getProjects = async (req, res, next) => {
  try {
    let projects = [];

    if (prisma) {
      try {
        projects = await prisma.project.findMany({
          orderBy: { createdAt: 'desc' },
          include: { tasks: true }
        });
      } catch (e) {
        projects = memoryProjects;
      }
    } else {
      projects = memoryProjects;
    }

    return res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let project;

    if (prisma) {
      try {
        project = await prisma.project.findUnique({
          where: { id },
          include: { tasks: true }
        });
      } catch (e) {
        project = memoryProjects.find(p => p.id === id);
      }
    } else {
      project = memoryProjects.find(p => p.id === id);
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const validated = createProjectSchema.parse(req.body);

    let project;
    if (prisma) {
      try {
        // Find default workspace if not provided
        let wsId = validated.workspaceId;
        if (!wsId) {
          const ws = await prisma.workspace.findFirst({ where: { ownerId: req.user.id } });
          wsId = ws ? ws.id : 'demo-ws-1';
        }

        project = await prisma.project.create({
          data: {
            workspaceId: wsId,
            name: validated.name,
            description: validated.description || '',
            status: validated.status || 'PLANNING',
            priority: validated.priority || 'MEDIUM',
            dueDate: validated.dueDate ? new Date(validated.dueDate) : null
          }
        });
      } catch (e) {
        project = {
          id: `proj_${Date.now()}`,
          workspaceId: validated.workspaceId || 'demo-ws-1',
          name: validated.name,
          description: validated.description || '',
          status: validated.status || 'PLANNING',
          priority: validated.priority || 'MEDIUM',
          dueDate: validated.dueDate || null,
          createdAt: new Date().toISOString()
        };
        memoryProjects.unshift(project);
      }
    } else {
      project = {
        id: `proj_${Date.now()}`,
        workspaceId: validated.workspaceId || 'demo-ws-1',
        name: validated.name,
        description: validated.description || '',
        status: validated.status || 'PLANNING',
        priority: validated.priority || 'MEDIUM',
        dueDate: validated.dueDate || null,
        createdAt: new Date().toISOString()
      };
      memoryProjects.unshift(project);
    }

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = updateProjectSchema.parse(req.body);

    let updated;
    if (prisma) {
      try {
        updated = await prisma.project.update({
          where: { id },
          data: {
            ...validated,
            dueDate: validated.dueDate ? new Date(validated.dueDate) : undefined
          }
        });
      } catch (e) {
        const index = memoryProjects.findIndex(p => p.id === id);
        if (index !== -1) {
          memoryProjects[index] = { ...memoryProjects[index], ...validated };
          updated = memoryProjects[index];
        }
      }
    } else {
      const index = memoryProjects.findIndex(p => p.id === id);
      if (index !== -1) {
        memoryProjects[index] = { ...memoryProjects[index], ...validated };
        updated = memoryProjects[index];
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found for update.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: updated
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (prisma) {
      try {
        await prisma.project.delete({ where: { id } });
      } catch (e) {
        memoryProjects = memoryProjects.filter(p => p.id !== id);
      }
    } else {
      memoryProjects = memoryProjects.filter(p => p.id !== id);
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
