import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoggedIn: false, email: null };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.isLoggedIn = true;
            state.email = action.payload;
        },
        clearUser(state) {
            state.isLoggedIn = false;
            state.email = null;
        },
    },
});

// Selectors
export const selectAuthState = (state) => state.user.isLoggedIn;
export const selectUserEmail = (state) => state.user.email;

// Actions
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
