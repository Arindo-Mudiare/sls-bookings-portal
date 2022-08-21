import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Booking";
import BookingInfo from "./BookingInfo";

const Booking = ({
  _id,
  additionalInfo,
  bookingDate,
  bookingType,
  createdBy,
  deliverTo,
  deliverToAddress,
  description,
  inputOffer,
  name,
  pickUpFrom,
  pickupAddress,
  quantity,
  rphoneNumber,
  sphoneNumber,
}) => {
  //   const { setEditJob, deleteJob } = useAppContext();
  const dispatch = useDispatch();
  let date = moment(bookingDate);
  date = date.format("MMM Do, YYYY");

  if (deliverToAddress == null) {
    deliverToAddress = "";
  }
  if (pickupAddress == null) {
    pickupAddress = "";
  }

  // const getBookId = (id) => {
  //   console.log(id);
  // };

  const deleteBooking = async (bookId) => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(`/api/user/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        dispatch(hideLoading());

        console.log(bookId);
        window.location.reload(true);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong!");
    }
  };

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h6>{description}</h6>
          <p>{bookingType}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <BookingInfo
            icon={<BsFillArrowUpSquareFill />}
            text={`Pick up Address: ${pickUpFrom}- ${pickupAddress}`}
          />
          {/* BsFillArrowDownSquareFill */}
          <BookingInfo icon={<FaCalendarAlt />} text={date} />
          <BookingInfo
            icon={<BsFillArrowDownSquareFill />}
            text={`Delivery Adress: ${deliverTo}- ${deliverToAddress}`}
          />
          {/* <div className={`status ${status}`}>{description}</div> */}
        </div>
        <footer>
          <div className="actions">
            <Link
              to={`/edit-booking/${_id}`}
              className="btn edit-btn"
              onClick={(f) => f}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteBooking(_id)}
            >
              {/* {() => deleteJob(_id)} */}
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Booking;
