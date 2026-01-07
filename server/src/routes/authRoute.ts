import express from "express";
import { getUser, logout, signin, signup } from "../controllers/Auth.js";
import { middleware } from "../middleware/middleware.js";
import { addLocation } from "../controllers/location.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin); 
authRouter.get("/me",middleware, getUser);
authRouter.post("/logout",middleware, logout);
authRouter.post("/addLocation",middleware, addLocation);

export default authRouter;