import { createSlice } from '@reduxjs/toolkit';

const initialState = { screen: null };

const modalSlice = createSlice({
    name: 'modal',
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

// Actions
export const { setModal, clearModal } = modalSlice.actions;

// Selectors
export const selectModal = (state) => state.modal.screen;

export default modalSlice.reducer;
