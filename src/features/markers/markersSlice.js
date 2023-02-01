import { createSelector, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_REGION } from "../../constants";

const initialState = {
  entities: [{ id: 1, lat: 0, lng: 0 }],
  location: DEFAULT_REGION,
  loading: false,
};

const markersSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    setMarkers(state, action) {
      state.entities = action.payload;
    },
    addMarker(state, action) {
      state.entities.push(action.payload);
    },
    deleteMarker(state, action) {
      state.entities = state.entities.filter(
        (marker) => marker.id !== action.payload
      );
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setMarkers, addMarker, setLocation, setLoading } =
  markersSlice.actions;

export const selectMarkers = (state) => state.markers.entities;
export const selectMarkersCount = createSelector(
  selectMarkers,
  (markers) => markers.length
);

export const selectLoading = (state) => state.markers.loading;

export const selectLocation = (state) => state.markers.location;

export default markersSlice.reducer;
