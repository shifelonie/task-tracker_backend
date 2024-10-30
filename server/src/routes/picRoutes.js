import express from "express";
import { getPic, createPic, updatePic, deletePic} from "../features/pic/PicController.js";

const router = express.Router();

router.get('/', getPic);
router.post('/', createPic);
router.put('/:id', updatePic);
router.delete('/:id', deletePic);

export default router;