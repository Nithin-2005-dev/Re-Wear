import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Requester user ID is required"]
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Receiver user ID is required"]
  },
  requesterItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: [true, "Requester item ID is required"]
  },
  targetItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: [true, "Target item ID is required"]
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

swapRequestSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("SwapRequest", swapRequestSchema);
