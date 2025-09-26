import { Router } from "express";
import { getAllOffers, getOffer, bulkUpsert, deleteOffer, deleteAllOffers } from "../controllers/promotionalController.js";

const router = Router();

router.get("/", getAllOffers);
router.get("/:id", getOffer);
router.post("/", bulkUpsert);
router.delete("/:id", deleteOffer);
router.delete("/", deleteAllOffers);

export default router;
