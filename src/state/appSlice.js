import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    deviceLocationPermission: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDeviceLocationPermission: (state, action) => {
            state.deviceLocationPermission = action.payload;
        },
    },
});

// Actions
export const { setDeviceLocationPermission } = appSlice.actions;

// Selectors
export const selectDeviceLocationPermissions = (state) =>
    state.app.deviceLocationPermission;

export default appSlice.reducer;
