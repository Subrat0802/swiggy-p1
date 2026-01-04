import { signInvalidation, signUpvalidation } from "../utils/zodvalidation.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = await signUpvalidation.parseAsync(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const checkuser = await User.findOne({ email: email });
        if (checkuser) {
            return res.status(200).json({
                message: "User already signup, Please signin",
                success: false,
            });
        }
        const response = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });
        if (!response) {
            return res.status(400).json({
                message: "Error while creating user, try again.",
                success: false,
            });
        }
        return res.status(200).json({
            message: "User signup successfully",
            success: true,
            user: response,
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
export const signin = async (req, res) => {
    try {
        const { email, password } = await signInvalidation.parseAsync(req.body);
        const response = await User.findOne({ email: email }).select("+password");
        if (!response) {
            return res.status(400).json({
                message: "User not found, please signup first.",
                success: false,
            });
        }
        const matchPassowrd = await bcrypt.compare(password, response.password);
        if (!matchPassowrd) {
            return res.status(400).json({
                message: "Incorrect Password",
                success: false,
            });
        }
        const token = jwt.sign({
            id: response._id,
            email: response.email,
        }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        response.password = undefined;
        return res.cookie("token", token, options).status(200).json({
            message: "User signin successfully",
            success: true,
            user: response,
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
                message: "Server error while user signin",
                success: false,
            });
        }
    }
};
//# sourceMappingURL=Auth.js.map