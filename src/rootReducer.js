import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import appSlice from "@features/appSlice";
import errorReducer from "@features/errorSlice";
import markersReducer from "@features/markersSlice";
import modalReducer from "@features/modalSlice";
import userReducer from "@features/userSlice";

const rootReducer = combineReducers({
  // auth: authReducer,
  app: appSlice,
  error: errorReducer,
  markers: markersReducer,
  modal: modalReducer,
  user: userReducer,
});

export default rootReducer;
