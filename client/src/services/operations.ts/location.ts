import { toast } from "sonner";
import { authEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const { ADD_LOCATION } = authEndpoint;

interface LocationTypes {
    locationName: string, lat: string, lon: string
}

export const addLocation = async ({locationName, lat, lon}:LocationTypes) => {
    try{
        const response = await apiConnector("POST", ADD_LOCATION, {locationName, lat, lon})
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong. Please try again.";

    toast.error(message);
    throw new Error(message);
  }
}