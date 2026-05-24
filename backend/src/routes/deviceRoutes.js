import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  registerDevice,
  getUserDevices,
} from "../controllers/deviceController.js";

const router = express.Router();

router.post("/", protect, registerDevice);

router.get("/", protect, getUserDevices);

export default router;