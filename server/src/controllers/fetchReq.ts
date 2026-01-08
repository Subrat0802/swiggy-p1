import { type Request, type Response } from "express";
import User from "../models/user.js";
import { locationValidation } from "../utils/zodvalidation.js";
import { ZodError } from "zod";

export const fetchRestaurant = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;

    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lon}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
      }
    );
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
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching restaurants from backend",
      success: false,
    });
  }
};

export const fetchRestaurantAfterUserLogin = async (
  req: Request,
  res: Response
) => {
  try {
    const { locationName, lat, lon } = await locationValidation.parseAsync(
      req.query
    );
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
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        errors: err.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    } else {
      return res.status(500).json({
        message: "Server error while user signup",
        success: false,
      });
    }
  }
};


const GITHUB_URL =
  "https://raw.githubusercontent.com/Subrat0802/swiggy-menu/main/items.json";

export const fetchRestaurantItems = async (req: Request, res: Response) => {
  const { lat, lon, resId } = req.query;

  const swiggyUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lon}&restaurantId=${resId}&submitAction=ENTER`;

  try {
    const swiggyRes = await fetch(swiggyUrl);
    const swiggyText = await swiggyRes.text();

    if (swiggyText) {
      const data = JSON.parse(swiggyText);
      return res.json({ source: "swiggy", data });
    }
  } catch (e) {
    
  }

  // 👉 fallback to github json
  const githubRes = await fetch(GITHUB_URL);
  const githubData = await githubRes.json();

  return res.json({ source: "github", data: githubData.data });
};