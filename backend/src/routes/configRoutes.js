import express from "express";

import {
  getDeviceConfig,
} from "../controllers/configController.js";

const router = express.Router();

router.get("/:deviceId", getDeviceConfig);

export default router;