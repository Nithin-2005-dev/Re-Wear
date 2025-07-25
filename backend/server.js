import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());

import authRoutes from "./routes/auth.js";
import { itemRouter } from "./routes/Item.js";
import redeemRouter from "./routes/redeemRequest.js";
import { swapRouter } from "./routes/swap.js";
app.use("/api/auth", authRoutes);
app.use("/api/item", itemRouter);
app.use("/api/redeem",redeemRouter );
app.use("/api/swap",swapRouter );
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
