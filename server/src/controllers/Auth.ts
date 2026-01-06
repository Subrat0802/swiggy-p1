import type { Request, Response } from "express";
import { signInvalidation, signUpvalidation } from "../utils/zodvalidation.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } =
      await signUpvalidation.parseAsync(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkuser = await User.findOne({ email: email });
    if (checkuser) {
      return res.status(403).json({
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

export const signin = async (req: Request, res: Response) => {
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

    const token = jwt.sign(
      {
        id: response._id,
        email: response.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    (response as any).password = undefined;

    return res.cookie("token", token, options).status(200).json({
      message: "User signin successfully",
      success: true,
      user: response,
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
        message: "Server error while user signin",
        success: false,
      });
    }
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { id } = req?.user;
    const user = await User.findById(id)
        
    if (!user) {
      return res.status(404).json({
        message: "user not found, please re-login.",
      });
    }
    return res.status(200).json({
      message: "All user Data",
      data: user,
    });

  } catch (error) {
    let errorMessage = "Something went wrong, server!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({
      message: "Server error while login.",
      success: false,
      error: errorMessage,
    });
  }
};


export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};