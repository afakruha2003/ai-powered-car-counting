import express from "express";
import { getStats } from "../controllers/garageStatsController.js";

const router = express.Router();

router.get("/:garageId", getStats);

export default router;
