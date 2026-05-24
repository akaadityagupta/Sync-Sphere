import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },

    channelId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    gpio: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["light", "fan", "switch"],
      default: "switch",
    },

    room: {
      type: String,
      default: "General",
    },

    state: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;