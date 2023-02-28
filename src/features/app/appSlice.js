import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "light" };

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// Actions
export const { setTheme } = appSlice.actions;

// Selectors
export const selectTheme = (state) => state.app.theme;

export default appSlice.reducer;
