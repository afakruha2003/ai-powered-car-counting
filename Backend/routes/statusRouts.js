import express from "express";
import { getStats } from "../controllers/garageStatsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:garageId", protect, getStats);

export default router;
