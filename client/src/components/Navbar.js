import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const showNotify = user?.isSuperAdmin ? true : false;

  // console.log(` user: ${user}`);

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">SLS Booking Portal</h3>
        </div>
        <div className="d-flex align-items-center btn-container">
          <div className="notify">
            {showNotify && (
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
                className="mx-4"
              >
                <i className="ri-notification-3-line header-action-icon px-2"></i>
              </Badge>
            )}
          </div>
          <button
            type="button"
            className="btn profile-user"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                localStorage.clear();
                window.location.reload(false);
                navigate("/login");
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
