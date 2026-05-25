import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        deviceId: {
            type: String,
            required: true,
            unique: true,
        },

        name: {
            type: String,
            required: true,
        },

        online: {
            type: Boolean,
            default: false,
        },
        lastSeen: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Device = mongoose.model("Device", deviceSchema);

export default Device;