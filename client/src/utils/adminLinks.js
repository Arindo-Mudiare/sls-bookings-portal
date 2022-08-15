import { FaCalendarAlt } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

const links = [
  {
    id: 1,
    text: "Booking Summary",
    path: "/admin/booking-stats",
    icon: <FaUserClock />,
  },
  {
    id: 2,
    text: "All Bookings",
    path: "/admin/bookings",
    icon: <FaCalendarAlt />,
  },
  {
    id: 3,
    text: "All Users",
    path: "/admin/users",
    icon: <FaUsers />,
  },
  {
    id: 4,
    text: "Admin Profile",
    path: "/admin/profile",
    icon: <RiAdminFill />,
  },
];

export default links;
