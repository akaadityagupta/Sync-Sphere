import Device from "../models/Device.js";

const checkOfflineDevices =
  async () => {

    const timeout = 30000;

    const devices =
      await Device.find();

    const now = Date.now();

    for (const device of devices) {

      if (!device.lastSeen)
        continue;

      const diff =
        now -
        new Date(
          device.lastSeen
        ).getTime();

      if (
        diff > timeout &&
        device.online
      ) {

        device.online = false;

        await device.save();

        console.log(
          `${device.deviceId} is OFFLINE`
        );
      }
    }
};

setInterval(
  checkOfflineDevices,
  10000
);