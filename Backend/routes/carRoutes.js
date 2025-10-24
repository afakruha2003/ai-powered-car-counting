import express from "express";
const router = express.Router();

import { printMsg } from "../controllers/carController.js";

router.route("/print").get(printMsg);

export default router
