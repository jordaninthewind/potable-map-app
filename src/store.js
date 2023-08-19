import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "@app/rootReducer";

export default configureStore({
  reducer: rootReducer,
});
