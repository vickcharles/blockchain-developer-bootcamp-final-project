import { configureStore } from "@reduxjs/toolkit";
import PropertyEvents from "./properties-event-listener";
import accountReducer from "./redux/AccountSlice";
import propertiesSlice from "./redux/Properties";
import appSlice from "./redux/App";

const store = configureStore({
  reducer: {
    account: accountReducer,
    properties: propertiesSlice,
    app: appSlice,
  },
});

export default store;

PropertyEvents(store.dispatch, store.getState);
