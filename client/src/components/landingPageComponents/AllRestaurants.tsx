import { useSelector } from "react-redux"
import type { RootState } from "../../main"
import RestaurantCard from "./RestaurantCard";
import TopRestaurantsSkeleton from "../loadingSkeleton/TopRestaurantsSkeleton";

const AllRestaurants = () => {
    const allRestaurants = useSelector((state: RootState) => state.restaurantsDetails.allRestaurants);
  return (
    <div className="w-full mt-20 px-4 md:px-0 mb-20">
        <div>
            <p className="text-2xl font-bold mb-5">All Restaurants</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 w-full">
            {
                allRestaurants == null ? (<TopRestaurantsSkeleton />) : (
                    allRestaurants.map((el) => (
                        <RestaurantCard el={el} style={"min-w-70"}/>
                    ))
                )
            }
        </div>
        
    </div>
  )
}

export default AllRestaurants