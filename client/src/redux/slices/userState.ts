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

function getStoredUser(): User | null {
  const stored = sessionStorage.getItem("user");

  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    // cleanup invalid data
    sessionStorage.removeItem("user");
    return null;
  }
}

const initialState: UserState = {
  user: getStoredUser(),
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
      sessionStorage.removeItem("user"); // IMPORTANT
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
