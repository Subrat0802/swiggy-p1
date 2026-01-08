import express from "express";
import { fetchRestaurant, fetchRestaurantAfterUserLogin, fetchRestaurantItems } from "../controllers/fetchReq.js";
import { middleware } from "../middleware/middleware.js";
const fetchReqRoute = express.Router();

fetchReqRoute.get("/restaurants", fetchRestaurant); //fetchRestaurantAfterUserLogin
fetchReqRoute.get("/restaurantsAfterLogin",middleware, fetchRestaurantAfterUserLogin); //
fetchReqRoute.get("/restaurantsfetchRestaurantItems",middleware, fetchRestaurantItems);

export default fetchReqRoute;