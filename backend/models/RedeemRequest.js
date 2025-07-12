import mongoose from "mongoose";

const redeemRequestSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: [true, "Item reference is required"]
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Customer (requester) is required"]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Owner (uploader) is required"]
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "accepted", "rejected", "completed"],
      message: "Status must be one of: pending, accepted, rejected, completed"
    },
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

redeemRequestSchema.index({ item: 1, customer: 1, status: 1 }, { unique: true, partialFilterExpression: { status: "pending" } });

export default mongoose.model("RedeemRequest", redeemRequestSchema);
