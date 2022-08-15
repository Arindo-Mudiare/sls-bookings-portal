import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaBus } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { FaTruckMonster } from "react-icons/fa";

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.user);
  const Id = user?._id;

  // admin sidebar
  const adminLinks = [
    // {
    //   id: 1,
    //   text: "Booking Summary",
    //   path: "/admin/booking-stats",
    //   icon: <FaUserClock />,
    // },
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
      path: `/admin/profile/${Id}`,
      icon: <RiAdminFill />,
    },
  ];

  // user links
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

  const menuToBeRendered = user?.isSuperAdmin ? adminLinks : links;
  return (
    <div className="nav-links">
      {menuToBeRendered.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active mr-2" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
