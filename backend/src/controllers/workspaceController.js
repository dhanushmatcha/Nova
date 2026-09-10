import prisma from '../config/db.js';

const fallbackWorkspaces = [
  { id: 'demo-ws-1', name: "Dhanu's Workspace", ownerId: 'demo-user-id-123', createdAt: new Date().toISOString() }
];

export const getWorkspaces = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let workspaces = [];

    if (prisma) {
      try {
        workspaces = await prisma.workspace.findMany({
          where: { ownerId: userId },
          include: { members: true, projects: true }
        });
      } catch (e) {
        workspaces = fallbackWorkspaces;
      }
    } else {
      workspaces = fallbackWorkspaces;
    }

    return res.status(200).json({
      success: true,
      data: workspaces
    });
  } catch (error) {
    next(error);
  }
};

export const createWorkspace = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Workspace name is required.' });
    }

    let workspace;
    if (prisma) {
      try {
        workspace = await prisma.workspace.create({
          data: {
            name,
            ownerId: userId,
            members: {
              create: {
                userId,
                role: 'OWNER'
              }
            }
          }
        });
      } catch (e) {
        workspace = { id: `ws_${Date.now()}`, name, ownerId: userId, createdAt: new Date().toISOString() };
        fallbackWorkspaces.push(workspace);
      }
    } else {
      workspace = { id: `ws_${Date.now()}`, name, ownerId: userId, createdAt: new Date().toISOString() };
      fallbackWorkspaces.push(workspace);
    }

    return res.status(201).json({
      success: true,
      message: 'Workspace created successfully.',
      data: workspace
    });
  } catch (error) {
    next(error);
  }
};

export const getMembers = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    let members = [];

    if (prisma) {
      try {
        members = await prisma.workspaceMember.findMany({
          where: { workspaceId },
          include: { user: { select: { id: true, name: true, email: true, role: true, avatar: true } } }
        });
      } catch (e) {
        members = [{ id: 'm1', workspaceId, userId: req.user.id, role: 'OWNER' }];
      }
    } else {
      members = [{ id: 'm1', workspaceId, userId: req.user.id, role: 'OWNER' }];
    }

    return res.status(200).json({
      success: true,
      data: members
    });
  } catch (error) {
    next(error);
  }
};
