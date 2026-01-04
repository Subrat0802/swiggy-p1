// import {toast} from "sonner";
import { resEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {restaurants} = resEndpoint;

export const restaurantsData = async ( ) => {
    try{
        const data = await apiConnector("GET", restaurants);
        console.log("Data", data);

    }catch(error){
        console.log(error);
    }
}