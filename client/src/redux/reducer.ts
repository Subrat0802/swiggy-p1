import { combineReducers } from "@reduxjs/toolkit";
import itemImagesSlice from "./slices/restaurants";

const rootReducer = combineReducers({
    restaurantsDetails: itemImagesSlice
})

export default rootReducer;