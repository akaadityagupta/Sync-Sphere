import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createChannel,
  getDeviceChannels,
  toggleChannelState,
} from "../controllers/channelController.js";

const router = express.Router();

router.post("/:deviceId", protect, createChannel);

router.get("/:deviceId", protect, getDeviceChannels);

router.put("/toggle/:channelId", protect, toggleChannelState);

export default router;