import { useEffect } from "react";
import { restaurantsItems } from "../services/operations.ts/reastaurantApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../main";
import { Link, useParams } from "react-router-dom";
import { setRestaurantsDetailsForItemPage } from "../redux/slices/restaurants";

const ItemsList = () => {
  const dispatch = useDispatch();
  const location = useSelector(
    (state: RootState) => state.locationState.location
  );

  const lat = location?.lat;
  const lon = location?.lon;
  const { id } = useParams();

  useEffect(() => {
    if (!lat || !lon || !id) return;

    const fetchItems = async () => {
      const res = await restaurantsItems({ lat, lon, resId: id });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const resDetails = res?.data?.data?.cards;

      console.log("RESDETAILS", resDetails);

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
  (     el: any) => el?.groupedCard?.cardGroupMap?.REGULAR
    );

    const regularCards =
    groupedCard?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];

    const filterResItems = regularCards.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (el: any) =>
        el?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    console.log(filterResItems);

    };

    fetchItems();
  }, [lat, lon, id]);

  return (
    <div className="w-full h-screen justify-center items-center flex flex-col gap-3">
      <p>Please try after sometime.</p>
      <Link to={"/"}>
        <p className="p-3 px-6 bg-green-900 hover:bg-green-800 transition-all duration-200 text-white cursor-pointer">
          Go back
        </p>
      </Link>
    </div>
  );
};

export default ItemsList;
