// import {toast} from "sonner";
import { resEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {restaurants} = resEndpoint;

export const restaurantsData = async () => {
    try{
        const response = await apiConnector("GET", restaurants);
        console.log("Data", response.data);

        return response.data || null;
        // dispatch(data?.data?.data[0]?.card?.card?.gridElements?.infoWithStyle?.info)

    }catch(error){
        console.log(error);
    }
}