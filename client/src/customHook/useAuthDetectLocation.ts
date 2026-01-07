import { useEffect } from "react"
import { getCurrentLocation } from "./getCurrentLocation";
import { me } from "../services/operations.ts/auth";
import { addLocation } from "../services/operations.ts/location";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/slices/location";


const useAutoDetactLocation = () => {
    const dispatch = useDispatch();
    
    const detectLocation = async () => {
        // Check if location already exists in localStorage
        const existingLocation = localStorage.getItem("location");
        const existingLat = localStorage.getItem("lat");
        const existingLon = localStorage.getItem("lon");
        
        if(existingLocation && existingLat && existingLon) {
            // Update Redux state with existing location
            dispatch(setLocation({
                location: existingLocation,
                lat: existingLat,
                lon: existingLon
            }));
            return;
        }
        
        try{
            const {lat, lon} = await getCurrentLocation();
            
            // Reverse geocode to get location name
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&limit=1`);
            const data = await response.json();
            
            let locationDisplayName = "Current Location";
            if(data && data.address) {
                const address = data.address;
                locationDisplayName = address.city || address.town || address.village || address.county || "Current Location";
            }
            
            // Update localStorage
            localStorage.setItem("lat", lat);
            localStorage.setItem("lon", lon);
            localStorage.setItem("location", locationDisplayName);
            
            // Update Redux state
            dispatch(setLocation({
                location: locationDisplayName,
                lat: lat,
                lon: lon
            }));
            
            const user = await me();
            if(user) {
                await addLocation({locationName: locationDisplayName, lat, lon});
            }
        }catch(error){
            console.log("Error while detecting current location", error);
            // Don't show error toast on initial load, just use fallback
            if(!existingLocation) {
                // Set a default location if we can't get current location
                const defaultLat = "28.6139"; // Delhi coordinates as fallback
                const defaultLon = "77.2090";
                const defaultLocation = "Delhi";
                
                localStorage.setItem("lat", defaultLat);
                localStorage.setItem("lon", defaultLon);
                localStorage.setItem("location", defaultLocation);
                
                dispatch(setLocation({
                    location: defaultLocation,
                    lat: defaultLat,
                    lon: defaultLon
                }));
            }
        }
    }

    useEffect(() => {
        detectLocation();
    }, []);
}

export default useAutoDetactLocation;