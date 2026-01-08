import { toast } from "sonner";
import { resEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {restaurants, restaurantsAfterLogin, restaurantsfetchRestaurantItems} = resEndpoint;

interface LatLonType {
    lat: string,
    lon: string,
    locationName?: string,
    resId?: string
}

export const restaurantsData = async ({lat, lon}: LatLonType) => {
    if(!lat || !lon){
        return;
    }
    try{
        const response = await apiConnector("GET", restaurants, null, {}, {lat, lon});
        return response.data || null;
    }catch(error){
        console.log(error);
    }
}


export const restaurantsDataAfterLogin = async ({locationName, lat, lon}: LatLonType) => {
    if(!locationName || !lat || !lon){
        return;
    }
    try{
        const response = await apiConnector("GET", restaurantsAfterLogin, null, {}, {locationName, lat, lon});
        return response.data || null;
        
    }catch(error){
        console.log(error);
    }
}

export const restaurantsItems = async ({lat, lon, resId}: LatLonType) => {
    try{
        const response = await apiConnector("GET", restaurantsfetchRestaurantItems, null, {}, {lat, lon, resId});
        return response;
    }catch(error){
        toast.error("Menu not available at the moment")
        return error
    }
    

}