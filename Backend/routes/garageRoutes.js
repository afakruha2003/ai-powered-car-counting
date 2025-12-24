import express from "express";
import { createGarage, updateGarage, getGarage, getMyGarages } from "../controllers/garageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/", protect, createGarage);

router.put("/:id", protect, updateGarage);

// router.get("/me", protect, getMyGarages);

router.get("/:id", protect, getGarage);

export default router;
