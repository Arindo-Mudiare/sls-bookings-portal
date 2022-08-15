import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: null,
    // reloadUser: true,
  },
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    // reloadUserData: (state, action) => {
    //   state.reloadUser = action.payload;
    // },
  },
});

export const { setBooking } = bookingSlice.actions;
