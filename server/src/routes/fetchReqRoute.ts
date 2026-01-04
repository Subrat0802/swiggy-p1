import express from "express";
import { fetchRestaurant } from "../controllers/fetchReq.js";
const fetchReqRoute = express.Router();

fetchReqRoute.get("/restaurants", fetchRestaurant);

export default fetchReqRoute;