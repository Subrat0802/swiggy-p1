import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  user: User | null;
}

const savedUser = sessionStorage.getItem("user");

const initialState: UserState = {
  user: savedUser ? JSON.parse(savedUser) : null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload; 
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
