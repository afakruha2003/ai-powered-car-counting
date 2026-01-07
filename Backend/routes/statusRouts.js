import express from "express";
import { getStats } from "../controllers/garageStatsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:garageId", protect, getStats);

export default router;
