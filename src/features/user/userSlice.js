import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload;
    },
    clearUser(state) {
      state.name = null;
    },
  },
});

// Selectors
export const selectUser = (state) => state.user.name;

// Actions
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
