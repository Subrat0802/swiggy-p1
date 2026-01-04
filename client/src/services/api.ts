const BASE_URL = import.meta.env.VITE_BASE_URL as string;
console.log(BASE_URL);

export const endpoint = {
    SIGNUP: BASE_URL + "/api/v1/auth/signup",
    SIGNIN: BASE_URL + "/api/v1/auth/signin"
} 

export const resEndpoint:{restaurants: string} = {
    restaurants: BASE_URL + "/api/v1/allRestaurants/restaurants",
} 