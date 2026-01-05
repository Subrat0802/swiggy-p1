import { useSelector } from "react-redux";
import type { RootState } from "../../main";
import { IMAGE_CDN } from "../../utils";
import TopRestaurantsSkeleton from "../loadingSkeleton/TopRestaurantsSkeleton";
import { StarIcon } from "../../assets/starSvg";

const TopRestaurants = () => {
  const toprestaurants = useSelector(
    (state: RootState) => state.restaurantsDetails.topRestaurants
  );
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold mb-5">Top Restaurants in your area</p>
        <div className="flex justify-between items-center gap-4">
          <p>left</p>
          <p>Right</p>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto">
        {toprestaurants == null ? (
          <TopRestaurantsSkeleton />
        ) : (
          toprestaurants.map((el) => (
            <div key={el.info.id} className="min-w-87.5">
              <img
                className=" min-w-82 max-h-50 object-cover rounded-xl"
                src={`${IMAGE_CDN + el.info.cloudinaryImageId}`}
              />
              <div className="p-2 px-4 flex flex-col">
                <p className="text-lg font-bold truncate text-black/80">{el.info.name}</p>
                <div className="flex items-center gap-3 text-lg text-black/70">
                  <div className="flex justify-between items-center  gap-1">
                    <StarIcon size={20} color="white"/>
                    <p>{el.info.avgRating}</p>
                  </div>
                  <p className="text-2xl">·</p>
                  <p>{el.info.costForTwo}</p>
                </div>
                <p className="truncate  text-black/60">{el.info.cuisines.join(", ")}</p>
                <p className="text-black/60 truncate">{el.info.areaName}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopRestaurants;
