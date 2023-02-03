import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null };

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action) {
      state.error.message = action.payload;
    },
    clearError(state) {
      state.error.message = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export const selectError = (state) => state.error.message;

export default errorSlice.reducer;