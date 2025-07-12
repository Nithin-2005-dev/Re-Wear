import { uploadToCloudinary } from "../helpers/cloudinary.js";
import cloudinary from "../config/cloudinary.js";
import { unlink } from "fs/promises";
import Item from "../models/Item.js";
import mongoose from "mongoose";

export const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      size,
      condition,
      tags,
      redeemCost,
    } = req.body;

    if (!req.user?._id) {
      return res.status(400).json({
        success: false,
        message: "User is required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    if (!title || !description || !category || !type || !size || !condition) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const uploadedUrls = [];
    const uploadedIds = [];

    for (const file of req.files) {
      const uploaded = await uploadToCloudinary(file.path);
      if (uploaded?.url && uploaded?.publicId) {
        uploadedUrls.push(uploaded.url);
        uploadedIds.push(uploaded.publicId);
        await unlink(file.path);
      }
    }

    if (uploadedUrls.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const item = await Item.create({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags ? tags.split(",") : [],
      redeemCost: redeemCost || 10,
      images: uploadedUrls,
      imageIds: uploadedIds,  // ✅ add this line
      uploader: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Item listed successfully",
      item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "approved" }).populate("uploader", "name email");
    res.status(200).json({
      success: true,
      message: "Items fetched successfully",
      items,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
      });
    }

    const item = await Item.findById(id).populate("uploader", "name email");

    if (!item || item.status !== "approved") {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};
