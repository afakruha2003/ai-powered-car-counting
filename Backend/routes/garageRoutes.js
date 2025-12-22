import express from "express";
import { createGarage, updateGarage, getGarage } from "../controllers/garageController.js";

const router = express.Router();

router.post("/", createGarage);

router.put("/:id", updateGarage);

router.get("/:id", getGarage);

export default router;
