import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_REGION } from '@constants/constants';

const initialState = {
    entities: [],
    selectedMarker: null,
    location: DEFAULT_REGION,
    loading: false,
    tempMarker: null,
};

const markersSlice = createSlice({
    name: 'markers',
    initialState,
    reducers: {
        addMarker(state, action) {
            state.entities.push(action.payload);
        },
        deleteMarker(state, action) {
            state.entities = state.entities.filter(
                (marker) => marker.id !== action.payload
            );
        },
        resetSelectedMarker(state) {
            state.selectedMarker = null;
        },
        resetTempMarker(state) {
            state.tempMarker = null;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setLocation(state, action) {
            state.location = action.payload;
        },
        setMarkers(state, action) {
            state.entities = action.payload;
        },
        setSelectedMarker(state, action) {
            state.selectedMarker = action.payload;
        },
        setTempMarker(state, action) {
            state.tempMarker = action.payload;
        },
    },
});

// Actions
export const {
    addMarker,
    deleteMarker,
    resetSelectedMarker,
    resetTempMarker,
    setLoading,
    setLocation,
    setMarkers,
    setSelectedMarker,
    setTempMarker,
} = markersSlice.actions;

// Selectors
export const selectLoading = (state) => state.markers.loading;
export const selectLocation = (state) => state.markers.location;
export const selectMarkers = (state) => state.markers.entities;
export const selectSelectedMarker = (state) => state.markers.selectedMarker;
export const selectTempMarker = (state) => state.markers.tempMarker;

export default markersSlice.reducer;
