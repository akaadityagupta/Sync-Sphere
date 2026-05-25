import Channel from "../models/Channel.js";
import Device from "../models/Device.js";
import { publishMessage } from "../mqtt/publisher.js";

export const createChannel = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const {
            channelId,
            name,
            gpio,
            type,
            room,
        } = req.body;

        const device = await Device.findById(deviceId);

        if (!device) {
            return res.status(404).json({
                message: "Device not found",
            });
        }

        if (device.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const channel = await Channel.create({
            device: device._id,
            channelId,
            name,
            gpio,
            type,
            room,
        });

        res.status(201).json(channel);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get channels for a device
export const getDeviceChannels = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const device = await Device.findById(deviceId);

        if (!device) {
            return res.status(404).json({
                message: "Device not found",
            });
        }

        if (device.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const channels = await Channel.find({
            device: deviceId,
        });

        res.status(200).json(channels);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const toggleChannelState = async (req, res) => {
    try {
        const { channelId } = req.params;

        const channel = await Channel.findById(channelId)
            .populate("device");

        if (!channel) {
            return res.status(404).json({
                message: "Channel not found",
            });
        }

        if (
            channel.device.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        channel.state = !channel.state;

        await channel.save();

        const topic = `syncsphere/device/${channel.device.deviceId}/channel/${channel.channelId}/command`;

        publishMessage(topic, {
            state: channel.state,
        });

        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};