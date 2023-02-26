import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import appSlice from "./features/app/appSlice";
import errorReducer from "./features/error/errorSlice";
import markersReducer from "./features/markers/markersSlice";
import modalReducer from "./features/modal/modalSlice";
import userReducer from "./features/user/userSlice";

const rootReducer = combineReducers({
  // auth: authReducer,
  app: appSlice,
  error: errorReducer,
  markers: markersReducer,
  modal: modalReducer,
  user: userReducer,
});

export default rootReducer;
