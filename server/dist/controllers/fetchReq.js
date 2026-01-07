import User from "../models/user.js";
import { locationValidation } from "../utils/zodvalidation.js";
import { ZodError } from "zod";
export const fetchRestaurant = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const response = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lon}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
                Accept: "application/json",
            },
        });
        const data = await response.json();
        if (!data) {
            return res.status(400).json({
                message: "Error while fetching restaurants",
                success: false,
            });
        }
        res.status(200).json({
            data: data.data.cards,
            message: "All restaurants",
            success: false,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error while fetching restaurants from backend",
            success: false,
        });
    }
};
export const fetchRestaurantAfterUserLogin = async (req, res) => {
    try {
        const { locationName, lat, lon } = await locationValidation.parseAsync(req.query);
        //@ts-ignore
        const { id } = req?.user;
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: {
                currentLocation: {
                    location: locationName,
                    lat,
                    lon,
                },
            },
        });
        if (!updateUser) {
            return res.status(402).json({
                message: "Error while updating user location",
                success: false,
            });
        }
        return res.status(200).json({
            message: "User location updated",
            success: true,
        });
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                errors: err.issues.map((e) => ({
                    path: e.path.join("."),
                    message: e.message,
                })),
            });
        }
        else {
            return res.status(500).json({
                message: "Server error while user signup",
                success: false,
            });
        }
    }
};
//# sourceMappingURL=fetchReq.js.map