import { useAppContext } from "../context/appContext";
import Navlinks from "./Navlinks";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";

import React from "react";

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  // const showSidebar = false;
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <h3>
              SLS <span>Bookings</span>
            </h3>
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
