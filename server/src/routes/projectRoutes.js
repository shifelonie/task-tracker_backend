import express from "express";
import { getProject, createProject, updateProject, deleteProject} from "../features/project/ProjectController.js";

const router = express.Router();

router.get('/', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;