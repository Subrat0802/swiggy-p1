const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const authEndpoint = {
    SIGNUP: BASE_URL + "/api/v1/auth/signup",
    SIGNIN: BASE_URL + "/api/v1/auth/signin",
    ME: BASE_URL + "/api/v1/auth/me",
    LOGOUT: BASE_URL + "/api/v1/auth/logout",
    ADD_LOCATION: BASE_URL + "/api/v1/auth/addLocation"
} 

export const resEndpoint = {
    restaurants: BASE_URL + "/api/v1/allRestaurants/restaurants",
    restaurantsAfterLogin: BASE_URL + "/api/v1/allRestaurants/restaurantsAfterLogin",
    restaurantsfetchRestaurantItems: BASE_URL + "/api/v1/allRestaurants/restaurantsfetchRestaurantItems"
} 

export const cartEndpoint = {
    addToCart: BASE_URL + "/api/v1/cart/addToCart",
    getAllCartItems: BASE_URL + "/api/v1/cart/getAllCartItems", 
    removeItem: BASE_URL + "/api/v1/cart/removeItem", 
    removeAllItems: BASE_URL + "/api/v1/cart/removeAllItems", 
} 

