import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createChannel,
  getDeviceChannels,
  removeChannel,
  toggleChannelState,
} from "../controllers/channelController.js";

const router = express.Router();

router.post("/:deviceId", protect, createChannel);

router.get("/:deviceId", protect, getDeviceChannels);

router.delete("/remove/:channelId", protect, removeChannel);

router.put("/toggle/:channelId", protect, toggleChannelState);

export default router;