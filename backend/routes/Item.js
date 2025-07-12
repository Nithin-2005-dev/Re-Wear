import express from "express";
import { createItem, getAllItems, getItemById} from "../controllers/itemController.js";
import { protect } from "../middleware/auth.js";
import multerMiddleware from "../middleware/imageUpload.js";

export const itemRouter = express.Router();

itemRouter.post("/create", protect, multerMiddleware.array("images",5), createItem)
itemRouter.get("/all", getAllItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/update/:id", protect, updateItem);
itemRouter.delete("/delete/:id", protect, deleteItem);