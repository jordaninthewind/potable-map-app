import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    deviceLocationPermission: null,
    uploadProgress: 0,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDeviceLocationPermission: (state, action) => {
            state.deviceLocationPermission = action.payload;
        },
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        },
        clearUploadProgress: (state) => {
            state.uploadProgress = 0;
        },
    },
});

// Actions
export const {
    setDeviceLocationPermission,
    setUploadProgress,
    clearUploadProgress,
} = appSlice.actions;

// Selectors
export const selectDeviceLocationPermissions = (state) =>
    state.app.deviceLocationPermission;

export const selectUploadProgress = (state) => state.app.uploadProgress;

export default appSlice.reducer;
