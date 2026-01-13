import express from "express";
import { addtoCart, getAllCartItems, removeAllItem, removeItem } from "../controllers/cart.js";
import { middleware } from "../middleware/middleware.js";
const cartRoute = express.Router();

cartRoute.post("/addToCart",middleware, addtoCart); 
cartRoute.get("/getAllCartItems",middleware, getAllCartItems);
cartRoute.post("/removeItem",middleware, removeItem);
cartRoute.post("/removeAllItems",middleware, removeAllItem);

export default cartRoute;