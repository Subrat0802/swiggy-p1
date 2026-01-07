/* eslint-disable @typescript-eslint/no-explicit-any */
import { authEndpoint } from "../api";
import { apiConnector } from "../apiConnector";
import { toast } from "sonner";
import axios from "axios";


const { SIGNUP, SIGNIN, ME, LOGOUT } = authEndpoint;


interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const signup = async ({
  firstName,
  lastName,
  email,
  password,
}: SignupPayload) => {
    if(!firstName || !lastName ||!email || !password){
        toast.error("Email and password are required")
        return;
    }
  try {
    const response = await apiConnector("POST", SIGNUP, {
      firstName,
      lastName,
      email,
      password,
    });

    toast.success("Signup successful");
    return response.data?.user;

  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong. Please try again.";

    toast.error(message);
    throw new Error(message);
  }
};



interface SigninPayload {
  email: string;
  password: string;
  lat?: string;
  lon?: string;
}

export const signin = async ({ email, password, lat, lon }: SigninPayload) => {
    if(!email || !password){
        toast.error("Email and password are required")
        return;
    }
  try {
    const response = await apiConnector("POST", SIGNIN, {
      email,
      password,
      lat: lat || "",
      lon: lon || "",
    });

    toast.success("Signin successful");
    return response.data?.user;

  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Invalid email or password";

    toast.error(message);
    throw new Error(message);
  }
};



export const me = async () => {
  try {
    const res = await apiConnector("GET", ME);
    return res?.data || res; 
  } catch (error: any) {
    let message = "User not logged in";

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 404) {
        console.log("User not authenticated");
        return null; 
      }
      message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    console.error("ME ROUTE ERROR:", message);
    return null; 
  }
};



export const logout = async () => {
    const res = await apiConnector("POST", LOGOUT);
    console.log("LOGOUT", res);
}
