import express from 'express';
import { createTask, deleteTasks, getTasks, updateTasks } from '../controllers/taskController.js';
const router = express.Router();

router.get('/', getTasks)
router.post('/', createTask)
router.put('/:id', updateTasks)
router.delete('/:id', deleteTasks)

export default router;