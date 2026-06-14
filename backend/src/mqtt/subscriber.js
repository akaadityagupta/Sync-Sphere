import mqttClient from "../config/mqtt.js";
import Device from "../models/Device.js";
import Channel from "../models/Channel.js";

mqttClient.subscribe(
    "syncsphere/device/+/config/request"
);

mqttClient.subscribe(
    "syncsphere/device/+/heartbeat",

    (err) => {

        if (!err) {

            console.log(
                "Heartbeat Active"
            );
        }
    }
);

mqttClient.subscribe(
    "syncsphere/device/+/channel/+/status"
);


mqttClient.on("message", async (
    topic,
    message
) => {

    try {

        if (topic.includes("/status")) {

            const parts = topic.split("/");

            const deviceId = parts[2];

            const channelId = parts[4];

            const payload =
                JSON.parse(message.toString());

            const state = payload.state;

            console.log(
                `${deviceId} ${channelId} state: ${state}`
            );

            const device =
                await Device.findOne({
                    deviceId,
                });

            if (!device) {

                console.log("Device not found");

                return;
            }

            const channel =
                await Channel.findOneAndUpdate(

                    {
                        device: device._id,

                        channelId,
                    },

                    {
                        state,
                    },

                    {
                        returnDocument: "after",
                    }
                );

            if (channel) {

                console.log(`DB Updated: ${channel.channelId} -> ${channel.state}`);
            }
        }


        if (topic.includes("/heartbeat")) {

            const deviceId =
                topic.split("/")[2];

            console.log(
                `${deviceId} is ONLINE`
            );

            const updatedDevice =
                await Device.findOneAndUpdate(

                    { deviceId },

                    {
                        online: true,

                        lastSeen: new Date(),
                    },

                    { returnDocument: "after" }
                );
        }

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