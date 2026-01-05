import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RestaurantsInfo {
    id: string,
    name: string,
    cloudinaryImageId: string,
    areaName: string
    cuisines: [string]
    costForTwo: string
    avgRating: string
}


//------

interface Images {
  id: string;
  imageId: string;
}

interface TopRestaurants {
    info: RestaurantsInfo
}

//----
interface ItemsImageState {
  itemsImage: Images[] | null;
  topRestaurants: TopRestaurants[] | null;
}

const initialState: ItemsImageState = {
  itemsImage: null,
  topRestaurants: null
};

const itemsImageSlice = createSlice({
  name: "itemsImages",
  initialState,
  reducers: {
    setItemsImage(state, action: PayloadAction<Images[]>) {
      state.itemsImage = action.payload;
    },
    setTopRestaurants(state, action: PayloadAction<TopRestaurants[]>) {
      state.topRestaurants = action.payload;
    },
  },
});

export const { setItemsImage, setTopRestaurants } = itemsImageSlice.actions;
export default itemsImageSlice.reducer;
