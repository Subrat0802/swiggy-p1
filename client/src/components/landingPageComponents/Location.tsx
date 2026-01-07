import { LocateIcon } from "lucide-react"
import { useState, type ChangeEvent } from "react"
import cities from "../../data/cities.json";
import { toast } from "sonner";
import { addLocation } from "../../services/operations.ts/location";
import { me } from "../../services/operations.ts/auth";
import { useDispatch } from "react-redux";
import { setLeftOpen } from "../../redux/slices/uiStates";
import { setLocation } from "../../redux/slices/location";
import { getCurrentLocation } from "../../customHook/getCurrentLocation";

const Location = () => {
    const [showCity, setShowCity] = useState<string[]>([]);
    const [locationName, setLocationName] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSearchLocation = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocationName(value);
        if(value.length < 2){
            setShowCity([]);
            return;
        }

        const filteredCities = cities.cities.filter((city) =>
            city.toLowerCase().includes(value.toLowerCase())
        );

        setShowCity(filteredCities);
    };

    const handleClickCity = async (cityName: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)},India&format=json&limit=1`);
            const data = await response.json();
            if(!data || data.length === 0){
                toast.error("No location found");
                setLoading(false);
                return;
            }
            const {lat, lon, display_name} = data[0];
            const locationDisplayName = display_name?.split(',')[0] || cityName;
            
            const isUserLogin = await me();
            
            // Update localStorage
            localStorage.setItem("location", locationDisplayName);
            localStorage.setItem("lat", lat);
            localStorage.setItem("lon", lon);
            
            // Update Redux state
            dispatch(setLocation({
                location: locationDisplayName,
                lat: lat,
                lon: lon
            }));
            
            if(isUserLogin){
                await addLocation({locationName: locationDisplayName, lat, lon});
            }
            
            setLocationName("");
            setShowCity([]);
            dispatch(setLeftOpen(false));
            toast.success(`Location changed to ${locationDisplayName}`);
        } catch (error) {
            toast.error("Failed to get location coordinates");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetCurrentLocation = async () => {
        setLoading(true);
        try {
            const {lat, lon} = await getCurrentLocation();
            
            // Reverse geocode to get location name
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&limit=1`);
            const data = await response.json();
            
            if(!data || !data.address){
                toast.error("Could not determine location name");
                setLoading(false);
                return;
            }
            
            // Extract city name from address
            const address = data.address;
            const locationDisplayName = address.city || address.town || address.village || address.county || "Current Location";
            
            const isUserLogin = await me();
            
            // Update localStorage
            localStorage.setItem("location", locationDisplayName);
            localStorage.setItem("lat", lat);
            localStorage.setItem("lon", lon);
            
            // Update Redux state
            dispatch(setLocation({
                location: locationDisplayName,
                lat: lat,
                lon: lon
            }));
            
            if(isUserLogin){
                await addLocation({locationName: locationDisplayName, lat, lon});
            }
            
            setLocationName("");
            setShowCity([]);
            dispatch(setLeftOpen(false));
            toast.success(`Location set to ${locationDisplayName}`);
        } catch (error) {
            toast.error("Failed to get current location. Please allow location access.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="h-full p-8 flex flex-col gap-3 ">
        <button onClick={handleGetCurrentLocation} disabled={loading} className=" mb-4 
          w-full border py-3 rounded-md font-medium hover:shadow-2xl
          hover:bg-green-900 hover:text-white transition-all duration-200 hover:scale-95 cursor-pointer flex justify-center items-center gap-2
          disabled:opacity-50 disabled:cursor-not-allowed
        ">{loading ? "Getting location..." : "Get your location"} <LocateIcon /></button>
        <div className="relative w-full">
            <input 
            placeholder="Search your city" 
            className="w-full p-3 border rounded-md mb-3 shadow-xl -mt-44 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"    
            onChange={(e) => handleSearchLocation(e)}
            value={locationName}
        />

            {showCity.length !== 0 &&<div className="absolute w-full  z-30 top-9 rounded-xl flex flex-col bg-white border border-black/20">
                {
                    showCity.map((el, i) => <p onClick={() => handleClickCity(el)} className="p-3 shadow-md text-lg hover:bg-green-900 hover:text-white
                    transition-all duration-200 cursor-pointer
                    " key={i}>{loading ? "loading..." : el}</p>)
                }
            </div>}
        </div>
        
    </div>
  )
}

export default Location