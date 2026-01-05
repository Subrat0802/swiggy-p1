/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StarIcon } from "../../assets/starSvg";
import { IMAGE_CDN } from "../../utils";

//@ts-expect-error
const RestaurantCard = ({ el, style }) => {
  return (
    <div key={el.info.id} className={`cursor-pointer hover:scale-95 transition-all duration-200 ${style}`}>
      <img
        className=" min-w-full max-h-50 object-cover rounded-xl"
        src={`${IMAGE_CDN + el.info.cloudinaryImageId}`}
      />
      <div className="p-2 px-4 flex flex-col">
        <p className="text-lg font-bold truncate text-black/80">
          {el.info.name}
        </p>
        <div className="flex items-center gap-3 text-lg text-black/70">
          <div className="flex justify-between items-center  gap-1">
            <StarIcon size={20} color="white" />
            <p>{el.info.avgRating}</p>
          </div>
          <p className="text-2xl">·</p>
          <p>{el.info.costForTwo}</p>
        </div>
        <p className="truncate  text-black/60">{el.info.cuisines.join(", ")}</p>
        <p className="text-black/60 truncate">{el.info.areaName}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
