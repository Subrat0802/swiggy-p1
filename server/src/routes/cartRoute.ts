import express from "express";
import { addtoCart, getAllCartItems } from "../controllers/cart.js";
import { middleware } from "../middleware/middleware.js";
const cartRoute = express.Router();

cartRoute.post("/addToCart",middleware, addtoCart); 
cartRoute.get("/getAllCartItems",middleware, getAllCartItems);

export default cartRoute;