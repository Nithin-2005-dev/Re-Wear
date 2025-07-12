import RedeemRequest from "../models/RedeemRequest.js";
import Item from "../models/Item.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const createRedeemRequest = async (req, res) => {
  try {
    const { itemId } = req.body;
    const customerId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ success: false, message: "Invalid item ID" });
    }

    const item = await Item.findById(itemId);
    if (!item || item.status !== "approved" || !item.available) {
      return res.status(404).json({ success: false, message: "Item not available for redeem" });
    }

    if (item.uploader.toString() === customerId.toString()) {
      return res.status(400).json({ success: false, message: "Cannot redeem your own item" });
    }

    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    if (customer.points < item.redeemCost) {
      return res.status(400).json({ success: false, message: "Insufficient points to redeem this item" });
    }

    const existingRequest = await RedeemRequest.findOne({ item: itemId, customer: customerId, status: "pending" });
    if (existingRequest) {
      return res.status(400).json({ success: false, message: "You already have a pending redeem request for this item" });
    }

    const redeemRequest = await RedeemRequest.create({
      item: itemId,
      customer: customerId,
      owner: item.uploader,
      status: "pending"
    });

    res.status(201).json({ success: true, message: "Redeem request created", redeemRequest });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

export const respondToRedeemRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // expected: 'accept' or 'reject'
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ success: false, message: "Invalid request ID" });
    }
    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }

    const redeemRequest = await RedeemRequest.findById(requestId).populate("item");
    if (!redeemRequest) {
      return res.status(404).json({ success: false, message: "Redeem request not found" });
    }

    if (redeemRequest.owner.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to respond to this request" });
    }

    if (redeemRequest.status !== "pending") {
      return res.status(400).json({ success: false, message: "Request is already responded" });
    }

    if (action === "reject") {
      redeemRequest.status = "rejected";
      await redeemRequest.save();
      return res.status(200).json({ success: true, message: "Redeem request rejected" });
    }

    // Accept flow
    const customer = await User.findById(redeemRequest.customer);
    const owner = await User.findById(userId);
    const item = redeemRequest.item;

    if (!customer || !owner) {
      return res.status(404).json({ success: false, message: "User(s) not found" });
    }

    if (customer.points < item.redeemCost) {
      return res.status(400).json({ success: false, message: "Customer has insufficient points" });
    }

    // Deduct points from customer, add to owner
    customer.points -= item.redeemCost;
    owner.points += item.redeemCost;

    // Mark item unavailable
    item.available = false;

    redeemRequest.status = "accepted";

    await Promise.all([
      customer.save(),
      owner.save(),
      item.save(),
      redeemRequest.save(),
    ]);

    res.status(200).json({ success: true, message: "Redeem request accepted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

export const getUserRedeemRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const requests = await RedeemRequest.find({
      $or: [{ customer: userId }, { owner: userId }],
    })
      .populate("item")
      .populate("customer", "name email")
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};
