import express from "express";
import { receiveCameraData } from "../controllers/cameraEventController.js";

const router = express.Router();

router.post("/data", receiveCameraData);

export default router;
