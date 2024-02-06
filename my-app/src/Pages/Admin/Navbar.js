import React from "react";
import { useAuth } from "../Component/auth";

const Navbar = (prop) => {
  const { username } = useAuth();
  return (
    <nav
      className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0"
      style={{ marginLeft: "5%" }}
    >
      <a href="#" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0">
          <i className="fa fa-hashtag"></i>
        </h2>
      </a>
      {/* <a
            href="#"
            className="sidebar-toggler flex-shrink-0"
            onClick={toggleSidebar}
          ></a> */}
      <button
        className="sidebar-toggler flex-shrink-0"
        onClick={prop.fcToggleSidebar}
      >
        <i className="fa fa-bars"></i>
      </button>

      <div
        className="navbar-nav align-items-center"
        style={{ marginLeft: "auto" }}
      >
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle-admin"
            data-bs-toggle="dropdown"
          >
            <img
              className="rounded-circle me-lg-2"
              src="/Assets/Images/user.jpg"
              alt=""
              style={{ width: "40px", height: "40px", marginRight: "20px" }}
            />
            <span className="d-none d-lg-inline-flex">{username}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              My Profile
            </a>
            <a href="#" className="dropdown-item">
              Settings
            </a>
            <a href="#" className="dropdown-item">
              Log Out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
