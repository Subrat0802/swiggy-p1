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

interface ResDetailsItemPage {
    id: string,
    name: string,
    cloudinaryImageId: string,
    areaName: string
    cuisines: [string]
    costForTwo: string
    avgRating: string,
    totalRatingsString: string,
    costForTwoMessage: string
}

interface AllCityBrands {
  text: string,
  link: string
}

interface DishCard {
  card: {
    info: {
      id: string;
      name: string;
      category?: string;
      imageId?: string;
      price?: number;
    };
  };
}

interface ItemCategory {
  title: string;
  itemsCard: DishCard[];
}



//----
interface ItemsImageState {
  itemsImage: Images[] | null;
  topRestaurants: TopRestaurants[] | null;
  allRestaurants: TopRestaurants[] | null;
  allCityBrands: AllCityBrands[] | null;
  restaurantsDetailsForItemPage: ResDetailsItemPage | null;
  itemsDetails: ItemCategory[] | null;
}

const initialState: ItemsImageState = {
  itemsImage: null,
  topRestaurants: null,
  allRestaurants: null,
  allCityBrands: null,
  restaurantsDetailsForItemPage:null,
  itemsDetails: null
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
    setAllRestaurants(state, action: PayloadAction<TopRestaurants[]>) {
      state.allRestaurants = action.payload;
    },
    setAllCityBrand(state, action: PayloadAction<AllCityBrands[]>) { //
      state.allCityBrands = action.payload
    },
    setRestaurantsDetailsForItemPage(state, action: PayloadAction<ResDetailsItemPage>) {
      state.restaurantsDetailsForItemPage = action.payload;
    },
    setItemsDetails(state, action: PayloadAction<ItemCategory[]>) {
      state.itemsDetails = action.payload
    } 
  },
});

export const { setItemsImage, setTopRestaurants, setAllRestaurants, setAllCityBrand, setRestaurantsDetailsForItemPage, setItemsDetails } = itemsImageSlice.actions;
export default itemsImageSlice.reducer;
