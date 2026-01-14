import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import { dbConnect } from "./config/database.js";
import fetchReqRoute from "./routes/fetchReqRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cartRoute from "./routes/cartRoute.js";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);


dbConnect();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/allRestaurants", fetchReqRoute); 
app.use("/api/v1/cart", cartRoute);

app.listen(3000);