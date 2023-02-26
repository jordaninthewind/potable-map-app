import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, action: null };

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action) {
      state.message = action.payload.message;
      state.action = action.payload.action;
    },
    clearError(state) {
      state.message = null;
      state.action = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export const selectError = (state) => state.error.message;

export default errorSlice.reducer;
