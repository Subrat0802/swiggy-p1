import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiStateInterface {
    leftOpen: boolean
    rightOpen: boolean
}

const initialState: UiStateInterface = {
    leftOpen: false,
    rightOpen: false, 
}

const uiStateSlice = createSlice({
    name: "uiState",
    initialState,
    reducers: {
        setLeftOpen(state, action: PayloadAction<boolean>) {
            state.leftOpen = action.payload
        },
        setRightOpen(state, action: PayloadAction<boolean>) {
            state.rightOpen = action.payload
        }
    }
})

export const {setLeftOpen, setRightOpen} = uiStateSlice.actions;
export default uiStateSlice.reducer;