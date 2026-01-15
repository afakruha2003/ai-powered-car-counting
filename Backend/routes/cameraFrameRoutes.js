import express from "express";
import multer from "multer";
import { uploadFrame, getLatestFrame } from "../controllers/cameraFrameController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
   storage,
   limits: { fileSize: 5 * 1024 * 1024 }
});

router.post("/upload", upload.single("frame"), uploadFrame);
router.get("/:garageId", protect, getLatestFrame);

export default router;
