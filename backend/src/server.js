import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import "./config/mqtt.js";
import "./mqtt/subscriber.js";
import configRoutes from "./routes/configRoutes.js";


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/device-config", configRoutes);


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Sync Sphere Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});