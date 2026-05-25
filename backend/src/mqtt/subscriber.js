import mqttClient from "../config/mqtt.js";

import Device from "../models/Device.js";
import Channel from "../models/Channel.js";

mqttClient.subscribe(
  "syncsphere/device/+/config/request"
);

mqttClient.on("message", async (
  topic,
  message
) => {

  try {

    console.log("MQTT Message:", topic);

    const payload =
      JSON.parse(message.toString());

    if (
      topic.includes("/config/request")
    ) {

      const deviceId = payload.deviceId;

      const device =
        await Device.findOne({
          deviceId,
        });

      if (!device) {

        console.log("Device not found");

        return;
      }

      const channels =
        await Channel.find({
          device: device._id,
        });

      const responseTopic =
        `syncsphere/device/${deviceId}/config/response`;

      const responsePayload = {

        channels: channels.map(
          (channel) => ({
            channelId:
              channel.channelId,

            gpio: channel.gpio,

            state: channel.state,
          })
        ),
      };

      mqttClient.publish(
        responseTopic,
        JSON.stringify(responsePayload)
      );

      console.log(
        "Config Sent:",
        responseTopic
      );
    }

  } catch (error) {

    console.log(error);

  }
});