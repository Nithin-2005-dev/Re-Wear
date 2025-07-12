import express from "express";
import { createItem, deleteItem, getAllItems, getItemById, getItemsByUser, updateItem} from "../controllers/itemController.js";
import { protect } from "../middleware/auth.js";
import multerMiddleware from "../middleware/imageUpload.js";

export const itemRouter = express.Router();

itemRouter.post("/create", multerMiddleware.array("images",5), createItem)
itemRouter.get("/all", getAllItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/update/:id", protect, updateItem);
itemRouter.delete("/delete/:id", protect, deleteItem);
itemRouter.get('/user/:userId', getItemsByUser)