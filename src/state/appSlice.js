import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    locationPermission: null,
    uploadProgress: 0,
    rightHanded: false,
    devMode: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLocationPermission: (state, action) => {
            state.locationPermission = action.payload;
        },
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        },
        clearUploadProgress: (state) => {
            state.uploadProgress = 0;
        },
        setDevMode: (state, action) => {
            state.devMode = action.payload;
        },
        setRightHanded: (state, action) => {
            state.rightHanded = action.payload;
        },
    },
});

// Actions
export const {
    setLocationPermission,
    setUploadProgress,
    clearUploadProgress,
    setDevMode,
    setRightHanded,
} = appSlice.actions;

// Selectors
export const selectLocationPermission = (state) => state.app.locationPermission;
export const selectUploadProgress = (state) => state.app.uploadProgress;
export const selectDevMode = (state) => state.app.devMode;
export const selectRightHanded = (state) => state.app.rightHanded;

export default appSlice.reducer;
