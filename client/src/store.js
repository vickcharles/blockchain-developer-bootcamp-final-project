import { configureStore } from "@reduxjs/toolkit";
import PropertyEvents from "./properties-event-listener";
import accountReducer from "./redux/AccountSlice";
import propertiesSlice from "./redux/Properties";

const store = configureStore({
  reducer: {
    account: accountReducer,
    properties: propertiesSlice,
  },
});

export default store;

PropertyEvents(store.dispatch, store.getState);
