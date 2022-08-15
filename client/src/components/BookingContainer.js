import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Booking from "./Booking";
import Wrapper from "../assets/wrappers/BookingContainer";
import PageBtnContainer from "./PageBtnContainer";
import React, { useEffect, useState } from "react";
import LayoutStrip from "./LayoutStrip";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const BookingContainer = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const getUserBookingsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-user-bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const {
    isLoading,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getUserBookingsData();
    console.log(bookings);
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return <Loading center />;
  }

  if (bookings.length === 0) {
    return (
      <Wrapper>
        <h2>You currently have no Bookings...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5> */}
      <div className="jobs">
        {bookings.map((booking) => {
          return <Booking key={booking._id} {...booking} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default BookingContainer;
