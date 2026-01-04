import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import { dbConnect } from "./config/database.js";
import fetchReqRoute from "./routes/fetchReqRoute.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONT_END,
    credentials: true
}));
dbConnect();
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/allRestaurants", fetchReqRoute);
app.listen(3000);
//# sourceMappingURL=index.js.map