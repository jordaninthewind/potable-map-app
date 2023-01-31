import { createSlice } from "@reduxjs/toolkit";

const initialState = { screen: null };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal(state, action) {
      state.screen = action.payload;
    },
    clearModal(state) {
      state.screen = null;
    },
  },
});

// Selectors
export const selectModal = (state) => state.modal.screen;

// Actions
export const { setModal, clearModal } = modalSlice.actions;

export default modalSlice.reducer;
