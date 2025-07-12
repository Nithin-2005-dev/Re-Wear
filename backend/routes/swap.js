import express from "express"
import { createSwapRequest, getIncomingSwapRequests, getMySwapRequests, rejectSwapRequest } from "../controllers/swapRequestController.js";
export const swapRouter = express.Router();
swapRouter.post("/create",createSwapRequest)
swapRouter.get("/getMyRequests/:id",getMySwapRequests);
swapRouter.get("/getRecievedRequests/:id",getIncomingSwapRequests);
swapRouter.patch("/reject/:id",rejectSwapRequest);
swapRouter.patch("/accept/:id",rejectSwapRequest);