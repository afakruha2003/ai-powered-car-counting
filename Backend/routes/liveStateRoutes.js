import express from "express";
import { getLiveState } from "../controllers/liveStateController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:garageId", protect, getLiveState);

export default router;
