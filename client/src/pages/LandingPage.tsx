import { useEffect } from "react";
import { restaurantsData } from "../services/operations.ts/reastaurantApi";

const LandingPage = () => {
    
    useEffect(() => {
        restaurantsData();
    }, []);
    
  return (
    <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto h-screen shadow-xl">
        </div>
    </div>
  )
}

export default LandingPage