import express from "express";
import { createGarage, updateGarage, getGarage, getMyGarages } from "../controllers/garageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMyGarages);

router.put("/:id", protect, updateGarage);

router.get("/:id", protect, getGarage);

export default router;
