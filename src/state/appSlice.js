import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
    deviceLocationPermission: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setDeviceLocationPermission: (state, action) => {
            state.deviceLocationPermission = action.payload;
        },
    },
});

// Actions
export const { setTheme, setDeviceLocationPermission } = appSlice.actions;

// Selectors
export const selectTheme = (state) => state.app.theme;
export const selectDeviceLocationPermissions = (state) =>
    state.app.deviceLocationPermission;

export default appSlice.reducer;
