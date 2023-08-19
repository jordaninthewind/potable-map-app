import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null };

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action) {
      state.message = action.payload.message;
      // state.action = action.payload.action;
    },
    clearError(state) {
      state.message = null;
      // state.action = null;
    },
  },
});

// Actions
export const { setError, clearError } = errorSlice.actions;

// Selectors
export const selectError = (state) => state.error.message;
export const selectErrorAction = (state) => state.error.action;

export default errorSlice.reducer;
