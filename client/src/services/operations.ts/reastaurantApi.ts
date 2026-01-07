import { resEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {restaurants, restaurantsAfterLogin} = resEndpoint;

interface LatLonType {
    lat: string,
    lon: string,
    locationName?: string
}

export const restaurantsData = async ({lat, lon}: LatLonType) => {
    if(!lat || !lon){
        return;
    }
    try{
        const response = await apiConnector("GET", restaurants, null, {}, {lat, lon});
        console.log("Getting restaurant from before signin", response);
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
        console.log("Getting restaurant from after signin", response);
        return response.data || null;
        
    }catch(error){
        console.log(error);
    }
}