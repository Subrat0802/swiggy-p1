import { useEffect } from "react";
import { restaurantsData } from "../services/operations.ts/reastaurantApi";
import { useDispatch, useSelector } from "react-redux";
import { setAllRestaurants, setItemsImage, setTopRestaurants } from "../redux/slices/restaurants";
import Carousel from "../components/landingPageComponents/Carousel";
import TopRestaurants from "../components/landingPageComponents/TopRestaurants";
import AllRestaurants from "../components/landingPageComponents/AllRestaurants";
import type { RootState } from "../main";
import { setLeftOpen } from "../redux/slices/uiStates";

const LandingPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
          const res = await restaurantsData()
          console.log("DATAAA", res?.data[0]?.card?.card?.gridElements?.infoWithStyle?.info)
          dispatch(setItemsImage(res?.data[0]?.card?.card?.gridElements?.infoWithStyle?.info));
          dispatch(setTopRestaurants(res?.data[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)); //4
          dispatch(setAllRestaurants(res?.data[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
        }
        fetchData();
    }, [dispatch]);

    const uiStates = useSelector((state: RootState) => state.uiStates);

    const handleClickLeftSidebar = () => {
      dispatch(setLeftOpen(false))
    }
    
  return (
    <div className="min-h-screen relative">
      <div className={`fixed left-0 top-0 h-screen w-[25%] bg-gray-100 transform transition-transform duration-300 ease-in-out ${uiStates.leftOpen ? 
        "translate-x-0" : "-translate-x-full"
      }`}>
        <button onClick={handleClickLeftSidebar} className="pt-24 ">Close</button>
      </div>

        <div className="max-w-7xl mx-auto h-screen">
          <Carousel />
          <TopRestaurants />
          <AllRestaurants />
        </div>
    </div>
  )
}

export default LandingPage