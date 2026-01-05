import { useEffect } from "react";
import { restaurantsData } from "../services/operations.ts/reastaurantApi";
import { useDispatch } from "react-redux";
import { setItemsImage, setTopRestaurants } from "../redux/slices/restaurants";
import Carousel from "../components/landingPageComponents/Carousel";

const LandingPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
          const res = await restaurantsData()
          console.log("DATAAA", res?.data[0]?.card?.card?.gridElements?.infoWithStyle?.info)
          dispatch(setItemsImage(res?.data[0]?.card?.card?.gridElements?.infoWithStyle?.info));
          dispatch(setTopRestaurants(res?.data[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)); //4
        }
        fetchData();
    }, [dispatch]);
    
  return (
    <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto h-screen">
          <Carousel />
        </div>
    </div>
  )
}

export default LandingPage