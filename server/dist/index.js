import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import { dbConnect } from "./config/database.js";
import fetchReqRoute from "./routes/fetchReqRoute.js";
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));
dbConnect();
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/allRestaurants", fetchReqRoute);
app.listen(3000);
//# sourceMappingURL=index.js.map