import express from "express";
import { getTask, createTask, updateTask, deleteTask} from "../features/task/TaskController.js";

const router = express.Router();

router.get('/', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;