import { combineReducers } from "@reduxjs/toolkit";
import itemImagesSlice from "./slices/restaurants";
import uiStateSlice from "./slices/uiStates";
import userStateSlice from "./slices/userState";

const rootReducer = combineReducers({
    restaurantsDetails: itemImagesSlice,
    uiStates: uiStateSlice,
    userState: userStateSlice
})

export default rootReducer;