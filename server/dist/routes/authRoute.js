import express from "express";
import { signup } from "../controllers/Auth.js";
const authRouter = express.Router();
authRouter.post("/signup", signup);
export default authRouter;
//# sourceMappingURL=authRoute.js.map