import { LocateIcon } from "lucide-react"
import { useState, type ChangeEvent } from "react"
import cities from "../../data/cities.json";
import { toast } from "sonner";

const Location = () => {
    const [showCity, setShowCity] = useState<string[]>([]);

    const handleSearchLocation = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        if(value.length < 3){
            setShowCity([]);
            return;
        }

        const filteredCities = cities.cities.filter((city) =>
            city.toLowerCase().includes(value)
        );

        setShowCity(filteredCities);
    };

    const handleClickCity = async (el: string) => {
        console.log(el);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${el},India&format=json&limit=1`);
        const data = await response.json();
        if(!data || data.length === 0){
            toast.error("No location found");
            return;
        }
        const {lat, lon} = data[0];
        console.log(lat, lon)
        setShowCity([]);
    }

  return (
    <div className="h-full p-8 flex flex-col gap-3 ">
        <div className="relative w-full">
            <input 
            placeholder="Search your city" 
            className="w-full p-3 border rounded-md mb-3 shadow-xl -mt-44 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"    
            onChange={(e) => handleSearchLocation(e)}
        />

            {showCity.length !== 0 &&<div className="absolute p-2 w-full z-30 top-9 rounded-lg flex flex-col bg-white border border-black/20">
                {
                    showCity.map((el, i) => <p onClick={() => handleClickCity(el)} className="p-3 shadow-md text-lg hover:bg-green-900 hover:text-white
                    transition-all duration-200 
                    " key={i}>{el}</p>)
                }
            </div>}
        </div>
        

        {/* <button className="
          w-full bg-green-900 text-white py-3 rounded-md font-medium
          hover:bg-green-800 transition-all duration-200 cursor-pointer
        ">Search</button> */}
        <button className="
          w-full border py-3 rounded-md font-medium hover:shadow-2xl
          hover:bg-green-900 hover:text-white transition-all duration-200 hover:scale-95 cursor-pointer flex justify-center items-center gap-2
        ">Get your location <LocateIcon /></button>
    </div>
  )
}

export default Location