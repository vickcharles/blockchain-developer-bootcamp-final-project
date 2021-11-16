import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./redux/AccountSlice";
import propertiesSlice from "./redux/Properties";

export default configureStore({
  reducer: {
    account: accountReducer,
    properties: propertiesSlice,
  },
});
