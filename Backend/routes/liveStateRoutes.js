import express from "express";
import { getLiveState } from "../controllers/liveStateController.js";

const router = express.Router();

router.get("/:garageId", getLiveState);

export default router;
