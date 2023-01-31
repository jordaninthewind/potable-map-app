import { createSlice } from "@reduxjs/toolkit";

const initialState = { error: null };

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export const selectError = (state) => state.error.error;

export default errorSlice.reducer;
