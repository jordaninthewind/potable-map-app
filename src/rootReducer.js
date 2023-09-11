import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import appSlice from '@state/appSlice';
import errorReducer from '@state/errorSlice';
import markersReducer from '@state/markersSlice';
import modalReducer from '@state/modalSlice';
import userReducer from '@state/userSlice';
import mapReducer from '@state/mapSlice';

const rootReducer = combineReducers({
    // auth: authReducer,
    app: appSlice,
    error: errorReducer,
    markers: markersReducer,
    modal: modalReducer,
    user: userReducer,
    map: mapReducer,
});

export default rootReducer;
