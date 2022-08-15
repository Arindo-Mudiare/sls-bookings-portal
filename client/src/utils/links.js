import { FaBus } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { FaTruckMonster } from "react-icons/fa";

const links = [
  {
    id: 1,
    text: "Your Bookings",
    path: "/",
    icon: <FaUserClock />,
  },
  {
    id: 2,
    text: "Book Bike Service",
    path: "/book-bikes",
    icon: <MdDirectionsBike />,
  },
  {
    id: 3,
    text: "Book Bus Service",
    path: "/book-bus",
    icon: <FaBus />,
  },
  {
    id: 4,
    text: "Book Truck Service",
    path: "/book-truck",
    icon: <FaTruck />,
  },
  {
    id: 5,
    text: "Interstate Dispatch",
    path: "/interstate-dispatch",
    icon: <FaTruckMonster />,
  },
];

export default links;
