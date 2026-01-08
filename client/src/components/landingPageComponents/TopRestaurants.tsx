import { useSelector } from "react-redux";
import type { RootState } from "../../main";
import TopRestaurantsSkeleton from "../loadingSkeleton/TopRestaurantsSkeleton";
import RestaurantCard from "./RestaurantCard";
import { CircleChevronRight, CircleChevronLeft } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { setRightOpen } from "../../redux/slices/uiStates";

const TopRestaurants = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    
  const toprestaurants = useSelector(
    (state: RootState) => state.restaurantsDetails.topRestaurants
  );

  const scrollLeft = () => {
    if(scrollRef.current){
        scrollRef.current.scrollLeft -= 500;
    }
  }
  const scrollRight = () => {
    if(scrollRef.current){
        scrollRef.current.scrollLeft += 500;
    }
  }

  // const getUser = useSelector((state: RootState) => state.userState.user);

  // const halndleClickOnCard = () => {
  //   if(!getUser){
  //     toast.warning("Please login first");
  //     dispatch(setRightOpen(true));
  //     return;
  //   }
  //   navigate("/items")
  // }

  return (
    <div className="my-7 mb-14 px-4 md:px-0">
      <div className="flex justify-between items-center mb-7">

          <p className="text-sm md:text-2xl text-black/80 font-bold">
            Top Restaurants in your area
          </p>

        <div  className="flex justify-between items-center gap-4 text-black/50">
          <span className="cursor-pointer" onClick={scrollLeft}><CircleChevronLeft /></span>
          <span className="cursor-pointer" onClick={scrollRight}><CircleChevronRight /></span>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth  no-scrollbar">
        {toprestaurants == null ? (
          <TopRestaurantsSkeleton />
        ) : (
          toprestaurants.map((el) => (
            // <div key={el.info.id} className="min-w-87.5">
            //   <img
            //     className=" min-w-82 max-h-50 object-cover rounded-xl"
            //     src={`${IMAGE_CDN + el.info.cloudinaryImageId}`}
            //   />
            //   <div className="p-2 px-4 flex flex-col">
            //     <p className="text-lg font-bold truncate text-black/80">{el.info.name}</p>
            //     <div className="flex items-center gap-3 text-lg text-black/70">
            //       <div className="flex justify-between items-center  gap-1">
            //         <StarIcon size={20} color="white"/>
            //         <p>{el.info.avgRating}</p>
            //       </div>
            //       <p className="text-2xl">·</p>
            //       <p>{el.info.costForTwo}</p>
            //     </div>
            //     <p className="truncate  text-black/60">{el.info.cuisines.join(", ")}</p>
            //     <p className="text-black/60 truncate">{el.info.areaName}</p>
            //   </div>
            // </div>
            <Link key={el.info.id} to={`/items/${el.info.id}`}><RestaurantCard
              el={el}
              // onClick={halndleClickOnCard}
              style="md:min-w-80 max-w-60"
            /></Link>

          ))
        )}
      </div>
    </div>
  );
};

export default TopRestaurants;
