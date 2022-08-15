import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertsSlice } from "./alertsSlice";
import { userSlice } from "./userSlice";
import { bookingSlice } from "./bookingsSlice";

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user: userSlice.reducer,
  bookings: bookingSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
