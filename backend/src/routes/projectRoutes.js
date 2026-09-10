import { Router } from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { getTasks, createTask } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Nested task routes for project
router.get('/:projectId/tasks', getTasks);
router.post('/:projectId/tasks', createTask);

export default router;
