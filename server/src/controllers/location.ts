import type { Request, Response } from "express";
import { locationValidation } from "../utils/zodvalidation.js";
import User from "../models/user.js";
import Location from "../models/locations.js";
import { ZodError } from "zod";


export const addLocation = async (req: Request, res: Response) => {
    try{
        const {locationName, lat, lon} = await locationValidation.parseAsync(req.body);
        //@ts-ignore
        const {id} = req?.user;

        const checkUser = await User.findById(id);

        if(!checkUser){
            return res.status(403).json({
                message:"Invalid credentials, or please signin again.",
                success:false
            })
        }

        // Update user's current location
        checkUser.currentLocation = {
            location: locationName,
            lat: lat,
            lon: lon
        };
        await checkUser.save();

        // Also save to locations collection for history
        const addLocationData = await Location.create({
            location: locationName,
            lat: lat,
            lon: lon,
            user: id
        })

        if(!addLocationData){
            return res.status(404).json({
                message:"Error while storing location data",
                success:false
            })
        }

        return res.status(200).json({
            message:"Location added successfully to user db",
            success:true,
            data: {
                location: locationName,
                lat: lat,
                lon: lon
            }
        })
    }catch (err: unknown) {
        if (err instanceof ZodError) {
          return res.status(400).json({
            errors: err.issues.map((e) => ({
              path: e.path.join("."),
              message: e.message,
            })),
          });
        } else {
          return res.status(500).json({
            message: "Server error while user adding location data to db",
            success: false,
          });
        }
      }
}