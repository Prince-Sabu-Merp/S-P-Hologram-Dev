import { Router } from "express";
import { getAllMessages, patchMessages } from "../controllers/messageController.js";

const router = Router();

router.get("/", getAllMessages);
router.patch("/", patchMessages);

export default router;
