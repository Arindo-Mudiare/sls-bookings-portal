import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
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

  let date = moment(bookingDate);
  date = date.format("MMM Do, YYYY");

  if (deliverToAddress == null) {
    deliverToAddress = "";
  }
  if (pickupAddress == null) {
    pickupAddress = "";
  }
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
            {/* <button type="button" className="btn delete-btn" onClick={(f) => f}>
              Delete
            </button> */}
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Booking;
