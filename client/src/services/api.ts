const BASE_URL = import.meta.env.VITE_BASE_URL as string;
console.log(BASE_URL);

export const authEndpoint = {
    SIGNUP: BASE_URL + "/api/v1/auth/signup",
    SIGNIN: BASE_URL + "/api/v1/auth/signin",
    ME: BASE_URL + "/api/v1/auth/me",
    LOGOUT: BASE_URL + "/api/v1/auth/logout"
} 

export const resEndpoint:{restaurants: string} = {
    restaurants: BASE_URL + "/api/v1/allRestaurants/restaurants",
} 

