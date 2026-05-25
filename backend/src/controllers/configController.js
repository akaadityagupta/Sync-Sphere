import Device from "../models/Device.js";
import Channel from "../models/Channel.js";

export const getDeviceConfig = async (
  req,
  res
) => {
  try {

    const { deviceId } = req.params;

    const device = await Device.findOne({
      deviceId,
    });

    if (!device) {
      return res.status(404).json({
        message: "Device not found",
      });
    }

    const channels = await Channel.find({
      device: device._id,
    });

    res.status(200).json({
      deviceId: device.deviceId,
      name: device.name,
      online: device.online,
      channels,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};