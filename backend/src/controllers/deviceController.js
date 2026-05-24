import Device from "../models/Device.js";

export const registerDevice = async (req, res) => {
  try {
    const { deviceId, name } = req.body;

    const existingDevice = await Device.findOne({ deviceId });

    if (existingDevice) {
      return res.status(400).json({
        message: "Device already registered",
      });
    }

    const device = await Device.create({
      user: req.user._id,
      deviceId,
      name,
    });

    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get devices for logged in user
export const getUserDevices = async (req, res) => {
  try {
    const devices = await Device.find({
      user: req.user._id,
    });

    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};