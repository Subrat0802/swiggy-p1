import { combineReducers } from "@reduxjs/toolkit";
import itemImagesSlice from "./slices/restaurants";
import uiStateSlice from "./slices/uiStates";
import userStateSlice from "./slices/userState";
import locationStateSlice from "./slices/location";

const rootReducer = combineReducers({
    restaurantsDetails: itemImagesSlice,
    uiStates: uiStateSlice,
    userState: userStateSlice,
    locationState: locationStateSlice
})

export default rootReducer;