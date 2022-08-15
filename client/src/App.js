import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/protectedRoute";
import Notifications from "./pages/Notifications";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import PassReset from "./components/PassReset";
import {
  UsersList,
  BookingsList,
  BookingStats,
  AdminProfile,
} from "./pages/Admin";
import Landing from "./pages/Landing";

import {
  Error,
  BookBikes,
  Home,
  BookBus,
  BookTruck,
  EditBooking,
  InterstateDispatch,
  UserBookings,
} from "./pages";
import SharedLayout from "./pages/SharedLayout";
import Profile from "./pages/Admin/AdminProfile";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />

      {/* Nested Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserBookings />} />
          <Route path="/book-bikes" element={<BookBikes />} />
          <Route path="/book-bus" element={<BookBus />} />
          <Route path="/book-truck" element={<BookTruck />} />
          <Route path="/interstate-dispatch" element={<InterstateDispatch />} />
          <Route path="profile" element={<Home />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/bookings" element={<BookingsList />} />
          <Route path="/admin/booking-stats" element={<BookingStats />} />
          <Route path="/admin/profile/:userId" element={<AdminProfile />} />
          <Route path="/edit-booking/:bookingId" element={<EditBooking />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
