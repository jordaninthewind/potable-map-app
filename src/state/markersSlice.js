import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_REGION } from '@constants/constants';

const initialState = {
    entities: [{ id: 1, lat: 0, lng: 0 }],
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
        setMarkers(state, action) {
            state.entities = action.payload;
        },
        setSelectedMarker(state, action) {
            state.selectedMarker = action.payload;
        },
        resetSelectedMarker(state) {
            state.selectedMarker = null;
        },
        setLocation(state, action) {
            state.location = action.payload;
        },
        setTempMarker(state, action) {
            state.tempMarker = action.payload;
        },
        resetTempMarker(state) {
            state.tempMarker = null;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

// Actions
export const {
    setMarkers,
    addMarker,
    deleteMarker,
    resetSelectedMarker,
    setLocation,
    setLoading,
    setSelectedMarker,
    setTempMarker,
    resetTempMarker,
} = markersSlice.actions;

// Selectors
export const selectLoading = (state) => state.markers.loading;
export const selectLocation = (state) => state.markers.location;
export const selectMarkers = (state) => state.markers.entities;
export const selectSelectedMarker = (state) => state.markers.selectedMarker;
export const selectTempMarker = (state) => state.markers.tempMarker;

export default markersSlice.reducer;
