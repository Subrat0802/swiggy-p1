import { useEffect } from "react";
import { restaurantsData } from "../services/operations.ts/reastaurantApi";
import { useDispatch, useSelector } from "react-redux";
import { setAllCityBrand, setAllRestaurants, setItemsImage, setTopRestaurants } from "../redux/slices/restaurants";
import Carousel from "../components/landingPageComponents/Carousel";
import TopRestaurants from "../components/landingPageComponents/TopRestaurants";
import AllRestaurants from "../components/landingPageComponents/AllRestaurants";
import type { RootState } from "../main";
import { setLeftOpen, setRightOpen } from "../redux/slices/uiStates";
import TopRestaurantsAcrossCity from "../components/landingPageComponents/TopRestaurantsAcrossCity";
import Auth from "../components/landingPageComponents/Auth";
import Location from "../components/landingPageComponents/Location";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useAutoDetactLocation from "../customHook/useAuthDetectLocation";

const LandingPage = () => {
    useAutoDetactLocation()
    const dispatch = useDispatch();

    // const user = useSelector((state: RootState ) => state.userState.user);
    const locationState = useSelector((state: RootState) => state.locationState.location);

    // Extract location values - use Redux state if available, otherwise fallback to localStorage
    const lat = locationState?.lat || localStorage.getItem("lat") || "";
    const lon = locationState?.lon || localStorage.getItem("lon") || "";
    // const locationName = locationState?.location || localStorage.getItem("location") || "";

    useEffect(() => {
        // Only fetch if we have valid coordinates
        if(!lat || !lon) {
            return;
        }
        
        const fetchData = async () => {
          try {
            // Always use restaurantsData to fetch restaurants
            // Location update for logged-in users is handled separately in Location.tsx via addLocation
            const res = await restaurantsData({lat, lon})
            if(res?.data) {
              dispatch(setItemsImage(res?.data[0]?.card?.card?.gridElements?.infoWithStyle?.info));
              dispatch(setTopRestaurants(res?.data[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)); //4
              dispatch(setAllRestaurants(res?.data[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)); //setBestPlaceAcrossCity
              dispatch(setAllCityBrand(res?.data[6]?.card?.card.brands));
            }
          } catch (error) {
            console.error("Error fetching restaurants:", error);
          }
        }
        fetchData();
    }, [dispatch, lat, lon]);

    const uiStates = useSelector((state: RootState) => state.uiStates);
    const userState = useSelector((state: RootState) => state.userState.user);

    const handleClickLeftSidebar = () => {
      dispatch(setLeftOpen(false))
    }
    const handleClickRightSidebar = () => {
      dispatch(setRightOpen(false))
    }

    const handleCloseSidebar = () => {
      if(!uiStates.leftOpen && !uiStates.rightOpen){
        return;
      }
      else if(uiStates.leftOpen){
        dispatch(setLeftOpen(false))
      }
      else if(uiStates.rightOpen){
        dispatch(setRightOpen(false))
      }
      
    }

    
  return (
    <div className="min-h-screen relative">
      <div className={`fixed left-0 top-0 h-screen w-full md:w-[25%] bg-neutral-50 shadow-xl transform transition-transform duration-300 ease-in-out ${uiStates.leftOpen ? 
        "translate-x-0" : "-translate-x-full"
      }`}>
        <button onClick={handleClickLeftSidebar} className="pt-24 cursor-pointer flex justify-between w-full px-2"><div></div> <div 
          className="p-1 bg-gray-200 rounded-full"
        ><ArrowLeft /></div></button>
        <Location />
      </div>

      {userState == null && <div className={`fixed right-0 top-0 w-full md:w-[25%] h-screen bg-neutral-50 shadow-xl transform transition-transform duration-400 ease-in-out ${uiStates.rightOpen ? 
        "translate-x-0" : "translate-x-full" 
      } `}>
        <button onClick={handleClickRightSidebar} className="pt-24 cursor-pointer flex justify-between w-full px-2"> <div 
          className="p-1 bg-gray-200 rounded-full"
        ><ArrowRight /> <div></div></div></button>
          <Auth />
      </div>}

        <div className="max-w-7xl mx-auto h-screen" onClick={handleCloseSidebar}>
          <Carousel />
          <TopRestaurants />
          <AllRestaurants />
          <TopRestaurantsAcrossCity />
        </div>
    </div>
  )
}

export default LandingPage