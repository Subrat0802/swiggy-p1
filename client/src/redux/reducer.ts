import { combineReducers } from "@reduxjs/toolkit";
import itemImagesSlice from "./slices/restaurants";
import uiStateSlice from "./slices/uiStates";

const rootReducer = combineReducers({
    restaurantsDetails: itemImagesSlice,
    uiStates: uiStateSlice
})

export default rootReducer;