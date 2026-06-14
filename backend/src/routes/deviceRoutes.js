import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  registerDevice,
  getUserDevices,
  removeDevice,
} from "../controllers/deviceController.js";

const router = express.Router();

router.post("/", protect, registerDevice);

router.get("/", protect, getUserDevices);

router.delete("/:deviceId", protect, removeDevice);

export default router;