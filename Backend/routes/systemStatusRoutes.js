import express from "express";
import { updateCameraPing, getSystemStatus } from "../controllers/systemStatusController.js";

const router = express.Router();

router.post("/ping", updateCameraPing);

router.get("/:garageId", getSystemStatus);

export default router;
