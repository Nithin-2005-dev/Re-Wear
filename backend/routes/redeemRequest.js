import express from "express";
import {
  createRedeemRequest,
  respondToRedeemRequest,
  getUserRedeemRequests,
} from "../controllers/redeemRequestController.js";
import { protect } from "../middleware/auth.js";

const redeemRouter = express.Router();

redeemRouter.post("/create", protect, createRedeemRequest);

redeemRouter.put("/respond/:requestId", protect, respondToRedeemRequest);

redeemRouter.get("/my-requests", protect, getUserRedeemRequests);

export default redeemRouter;
