import { Router } from 'express';
import { getWorkspaces, createWorkspace, getMembers } from '../controllers/workspaceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getWorkspaces);
router.post('/', createWorkspace);
router.get('/:workspaceId/members', getMembers);

export default router;
