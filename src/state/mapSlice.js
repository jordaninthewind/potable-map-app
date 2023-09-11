import { createSlice } from '@reduxjs/toolkit';

const initialState = { zoom: null };

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setZoom: (state, action) => {
            state.zoom = action.payload;
        },
        clearZoom: (state) => {
            state.zoom = null;
        },
    },
});

// Selectors
export const selectZoom = (state) => state.map.zoom;

// Actions
export const { setZoom, clearZoom } = mapSlice.actions;

export default mapSlice.reducer;
