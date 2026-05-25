import mqtt from "mqtt";
import dotenv from "dotenv";
dotenv.config();

const HOST = process.env.MQTT_HOST;
const PORT = process.env.MQTT_PORT;
const USERNAME = process.env.MQTT_USERNAME;
const PASSWORD = process.env.MQTT_PASSWORD;

const mqttClient = mqtt.connect({

    host: HOST,
    port: PORT,
    protocol: "mqtts",
    username: USERNAME,
    password: PASSWORD,
});

mqttClient.on("connect", () => {

    console.log("MQTT Connected");

});

mqttClient.on("error", (error) => {

    console.log("MQTT Error:", error);

});

export default mqttClient;