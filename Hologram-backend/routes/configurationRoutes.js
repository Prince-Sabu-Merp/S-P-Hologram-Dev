import { Router } from "express";
import { getConfiguration, updateConfiguration } from "../controllers/configurationController.js";

const router = Router();

// Define your configuration routes here
router.get("/", getConfiguration);
router.patch("/", updateConfiguration);

export default router;
