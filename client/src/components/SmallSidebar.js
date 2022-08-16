import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";

import Logo from "./Logo";
import Navlinks from "./Navlinks";

import React from "react";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>

          <Navlinks toggleSidebar={toggleSidebar} />
          <header className="mt-4">
            <Logo />
          </header>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
