import { createSelector, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_REGION } from "../../constants";

const initialState = {
  entities: [{ id: 1, lat: 0, lng: 0 }],
  selectedMarker: null,
  location: DEFAULT_REGION,
  loading: false,
};

const markersSlice = createSlice({
  name: "markers",
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
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setMarkers,
  addMarker,
  deleteMarker,
  resetSelectedMarker,
  setLocation,
  setLoading,
  setSelectedMarker,
} = markersSlice.actions;

export const selectMarkers = (state) => state.markers.entities;
export const selectMarkersCount = createSelector(
  selectMarkers,
  (markers) => markers.length
);

export const selectSelectedMarker = (state) => state.markers.selectedMarker;

export const selectLoading = (state) => state.markers.loading;

export const selectLocation = (state) => state.markers.location;

export default markersSlice.reducer;
