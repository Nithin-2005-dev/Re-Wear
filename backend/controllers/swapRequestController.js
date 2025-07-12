import SwapRequest from "../models/SwapRequest.js";
import Item from "../models/Item.js";
import mongoose from "mongoose";

export const createSwapRequest = async (req, res) => {
  try {
    const { requesterItem, targetItem } = req.body;
    const requester = req.user._id;

    if (!requesterItem || !targetItem) {
      return res.status(400).json({ success: false, message: "Both item IDs are required" });
    }

    const requesterItemData = await Item.findById(requesterItem);
    const targetItemData = await Item.findById(targetItem);

    if (!requesterItemData || !targetItemData) {
      return res.status(404).json({ success: false, message: "One or both items not found" });
    }

    if (!requesterItemData.available || !targetItemData.available) {
      return res.status(400).json({ success: false, message: "One or both items are not available" });
    }

    if (targetItemData.uploader.toString() === requester.toString()) {
      return res.status(400).json({ success: false, message: "You cannot request your own item" });
    }

    const existingRequest = await SwapRequest.findOne({
      requester,
      requesterItem,
      targetItem,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(409).json({ success: false, message: "Swap request already exists" });
    }

    const newRequest = await SwapRequest.create({
      requester,
      receiver: targetItemData.uploader,
      requesterItem,
      targetItem,
    });

    return res.status(201).json({ success: true, message: "Swap request created", request: newRequest });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const acceptSwapRequest = async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id);
    if (!request || request.status !== "pending") {
      return res.status(404).json({ success: false, message: "Swap request not found or already handled" });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to accept this request" });
    }

    await Item.findByIdAndUpdate(request.requesterItem, { available: false });
    await Item.findByIdAndUpdate(request.targetItem, { available: false });

    request.status = "accepted";
    await request.save();

    return res.status(200).json({ success: true, message: "Swap request accepted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const rejectSwapRequest = async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id);
    if (!request || request.status !== "pending") {
      return res.status(404).json({ success: false, message: "Swap request not found or already handled" });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to reject this request" });
    }

    request.status = "rejected";
    await request.save();

    return res.status(200).json({ success: true, message: "Swap request rejected" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getMySwapRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({ requester: req.user._id })
      .populate("requesterItem targetItem receiver", "title images");

    return res.status(200).json({ success: true, requests });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getIncomingSwapRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({ receiver: req.user._id, status: "pending" })
      .populate("requesterItem targetItem requester", "title images");

    return res.status(200).json({ success: true, requests });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
