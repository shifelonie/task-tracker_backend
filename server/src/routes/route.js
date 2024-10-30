import express from "express";
import picRoutes from "./picRoutes.js";
import projectRoutes from "./projectRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("project ready.");
});

router.use('/pic', picRoutes);

router.use('/project', projectRoutes);

router.use('/task', taskRoutes);

export default router;