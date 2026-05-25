import mqttClient from "../config/mqtt.js";

export const publishMessage = (
  topic,
  message
) => {
  mqttClient.publish(
    topic,
    JSON.stringify(message)
  );

  console.log("Published:", topic, message);
};