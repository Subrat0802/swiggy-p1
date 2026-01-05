import { combineReducers } from "@reduxjs/toolkit";
import itemImagesSlice from "./slices/restaurants";

const rootReducer = combineReducers({
    itemImagesState: itemImagesSlice
})

export default rootReducer;