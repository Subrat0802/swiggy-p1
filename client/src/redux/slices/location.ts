import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface LocationInst {
    location: string,
    lat: string,
    lon: string,
}

interface LocationState {
    location: LocationInst | null
}

const initalState: LocationState = {
    location: null
}

const locationSlice = createSlice({
    name: "location",
    initialState: initalState,
    reducers: {
        setLocation(state, action: PayloadAction<LocationInst>) {
            state.location = action.payload;
        }
    }
})

export const {setLocation} = locationSlice.actions;
export default locationSlice.reducer;