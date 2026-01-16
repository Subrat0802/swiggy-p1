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


interface slaString {
  slaString: string
}

interface ResDetailsItemPage {
    sla: slaString;
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

interface intemAttribute {
  vegClassifier: string
}

interface ratingCountV2 {
  ratingCountV2: string,
  rating: string
}

interface aggregatedRating {
  aggregatedRating: ratingCountV2
}

interface DishCard {
  card: {
    info: {
      ratings: aggregatedRating;
     
      defaultPrice: number;
      vegClassifier: string
      itemAttribute: intemAttribute;
      id: string;
      name: string;
      category?: string;
      imageId?: string;
      price?: number;
      card: never
    };
  };
}

interface ItemCategory {
  title: string;
  itemsCard: DishCard[];
}

interface CartInfo {
  id: string
  image: string,
  name: string,
  price: number
}

//----
interface ItemsImageState {
  itemsImage: Images[] | null;
  topRestaurants: TopRestaurants[] | null;
  allRestaurants: TopRestaurants[] | null;
  allCityBrands: AllCityBrands[] | null;
  restaurantsDetailsForItemPage: ResDetailsItemPage | null;
  itemsDetails: ItemCategory[] | null;
  cartItems: CartInfo[] 
}

const initialState: ItemsImageState = {
  itemsImage: null,
  topRestaurants: null,
  allRestaurants: null,
  allCityBrands: null,
  restaurantsDetailsForItemPage:null,
  itemsDetails: null,
  cartItems: []
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
    },
    setCartItems(state, action: PayloadAction<CartInfo>){
      state.cartItems.push(action.payload)
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
    },
    clearCart(state) {
      state.cartItems = [];
    }
  },
});

export const { setItemsImage, setTopRestaurants, setAllRestaurants, setAllCityBrand, setRestaurantsDetailsForItemPage, setItemsDetails, setCartItems, removeFromCart, clearCart } = itemsImageSlice.actions;
export default itemsImageSlice.reducer;
