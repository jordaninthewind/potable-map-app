import { combineReducers } from "@reduxjs/toolkit";
// import { firebaseReducer } from 'react-redux-firebase'
// import { firestoreReducer } from 'redux-firestore'

// Reducers
import markersReducer from "./features/markers/markersSlice";
import modalReducer from "./features/modal/modalSlice";
import errorReducer from "./features/error/errorSlice";
import userReducer from "./features/user/userSlice";

const rootReducer = combineReducers({
  // firebase: firebaseReducer,
  // firestore: firestoreReducer,
  // auth: authReducer,
  user: userReducer,
  error: errorReducer,
  modal: modalReducer,
  markers: markersReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
