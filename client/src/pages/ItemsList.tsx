import { useEffect, useState } from "react";
import { restaurantsItems } from "../services/operations.ts/reastaurantApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../main";
import { useParams } from "react-router-dom";
import {
  setItemsDetails,
  setRestaurantsDetailsForItemPage,
} from "../redux/slices/restaurants";
import { StarIcon } from "../../src/assets/starSvg";
import { ChevronDown, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGE_CDN } from "../utils";

const ItemsList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useSelector(
    (state: RootState) => state.locationState.location
  );
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const lat = location?.lat;
  const lon = location?.lon;
  const { id } = useParams();

  useEffect(() => {
    if (!lat || !lon || !id) return;

    const fetchItems = async () => {
      setLoading(true);
      const res = await restaurantsItems({ lat, lon, resId: id });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const resDetails = res?.data?.data?.cards;

      const filterResDetails = await resDetails.filter(
        (el: { card: { card: { [x: string]: string } } }) =>
          el?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
      );
      dispatch(
        setRestaurantsDetailsForItemPage(filterResDetails[0]?.card?.card?.info)
      );

      const groupedCard = resDetails.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el: any) => el?.groupedCard?.cardGroupMap?.REGULAR
      );

      const regularCards =
        groupedCard?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];

      const filterResItems = regularCards.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el: any) =>
          el?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
      setLoading(false);
      const items = filterResItems
        .map((el) => el?.card?.card)
        .filter((el) => el.title && Array.isArray(el.itemCards))
        .map((el) => ({
          title: el.title,
          itemsCard: el.itemCards,
        }));
      console.log("ITEMS,", items);
      dispatch(setItemsDetails(items));
    };

    fetchItems();
  }, [lat, lon, id]);

  const resDet = useSelector(
    (state: RootState) => state.restaurantsDetails.restaurantsDetailsForItemPage
  );

  const allItems = useSelector(
    (state: RootState) => state.restaurantsDetails.itemsDetails
  );

  const handleTitleClick = (index: number) => {
    console.log(index);

    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (resDet == null) {
    return;
  }

  return (
    <div className="w-full min-h-screen flex justify-center  pt-20">
      <div className="max-w-4xl w-full p-10">
        {!loading && resDet === null ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="py-7 mb-6 flex gap-3 justify-start text-xs">
              <p>Home /</p>
              <p>category /</p>
              <p>items </p>
            </div>
            <p className="text-3xl font-bold text-black/80 ">{resDet?.name}</p>
            <div className="w-ful p-5 border border-gray-200/70 shadow-xl rounded-xl relative">
              {/* <img
                      className=" min-w-full max-h-50 object-cover rounded-xl"
                      src={`${IMAGE_CDN + resDet.cloudinaryImageId}`}
                    /> */}
              <div className="p-2 px-4 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-lg font-semibold  text-black/70">
                  <div className="flex justify-between items-center  gap-1">
                    <StarIcon size={20} color="white" />
                    <p>{resDet.avgRating}</p>
                    <p>({resDet.totalRatingsString})</p>
                  </div>
                  <p className="text-2xl">·</p>
                  <p>{resDet.costForTwoMessage}</p>
                </div>
                <p className="truncate font-semibold   text-green-900/70 underline underline-offset-1">
                  {resDet.cuisines.join(", ")}
                </p>

                <div className="flex gap-3 py-2 mb-6">
                  <div className="w-5  flex flex-col justify-center items-center ">
                    <div className="p-1 rounded-full bg-gray-500"></div>
                    <div className="border-r-2 border-gray-500 h-7"></div>
                    <div className="p-1 rounded-full bg-gray-500"></div>
                  </div>

                  <div className="flex flex-col text-sm gap-4">
                    <div className="flex gap-3">
                      <p className="font-semibold">Outlet</p>
                      <p className="text-black/60 truncate">
                        {resDet.areaName}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">{resDet.sla.slaString}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-400  p-4 absolute w-full bottom-0 left-0 rounded-b-xl"></div>{" "}
            </div>

            <div className="rounded-xl flex flex-col gap-2 mt-6">
              {allItems?.map((el, i) => (
                <div className="bg-gray-100 rounded-xl" key={i}>
                  <div
                    className="flex justify-between items-center px-3 py-4 cursor-pointer"
                    onClick={() => handleTitleClick(i)}
                  >
                    <p className="text-lg text-black/80 font-semibold">
                      {el?.title}
                    </p>
                    <div
                      className={
                        openIndex === i
                          ? "rotate-0 transition-all duration-200"
                          : "rotate-180 transition-all duration-200"
                      }
                    >
                      <ChevronDown />
                    </div>
                  </div>

                  <div>
                    <div>
                      {el.itemsCard.map((el) => (
                        <AnimatePresence key={el.card.info.id}>
                          {openIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 py-7 border-b border-gray-300 flex mx-4 rounded-xl mb-3">
                                <div className=" w-full">
                                  <div className="min-w-[70%]" >
                                  {el.card.info.itemAttribute.vegClassifier ===
                                  "NONVEG" ? (
                                    <img className="max-w-5" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Non_veg_symbol.svg" />
                                  ) : (
                                    <img className="max-w-5" src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg" />
                                  )}
                                </div>
                                <p className="font-semibold text-black/80 text-lg py-1 pt-2">
                                  {el.card.info.name} 
                                </p>
                                <div className="flex gap-2 items-center">
                                  <p className="font-semibold text-gray-500/70 text-lg py-2 line-through">₹{el.card.info.defaultPrice / 100} </p>
                                  <p className="font-semibold text-black/60 text-lg py-2 ">₹{el.card.info.defaultPrice / 100 + 60} </p>
                                  <Tag className="text-green-900 bg-clip-text " width={15}/>
                                </div>
                                </div>
                                <div className=" w-[30%] relative">
                                  <div className="flex justify-center items-center absolute -bottom-6 p-2 bg-transaprent w-full mx-auto">
                                    <div className="bg-white border border-green-800 px-9 rounded-xl py-2 cursor-pointer">Add</div>
                                  </div>
                                  <img className="rounded-xl" src={`${IMAGE_CDN}${el.card.info.imageId}`}/>
                                </div>
                                
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsList;
