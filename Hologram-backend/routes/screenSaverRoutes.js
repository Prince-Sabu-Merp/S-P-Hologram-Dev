import { Router } from "express";
import { getScreenSaver, updateScreenSaver } from "../controllers/screenSaverController.js";

const router = Router();

router.get("/", getScreenSaver);
router.post("/", updateScreenSaver);

export default router;
