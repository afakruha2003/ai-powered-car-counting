import express from "express";
const router = express.Router();

import { getCounter, incrementCounter, resetCounter } from "../controllers/counterController.js";

router.route("/increment/:count").post(incrementCounter);
router.route("/reset").put(resetCounter);
router.route("/").get(getCounter);

export default router;
