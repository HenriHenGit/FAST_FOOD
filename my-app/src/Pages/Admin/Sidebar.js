import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Component/auth";
const Sidebar = (prop) => {
  const { username } = useAuth();
  return (
    <div
      className={`sidebar-admin pe-4 pb-3 ${prop.value ? "open-admin" : ""}`}
    >
      <nav className="navbar bg-light navbar-light">
        <a href="#" className="navbar-brand mx-4 mb-3">
          <h5 className="text-primary">
            <i className="me-2"></i>FAST FOOD
          </h5>
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src="/Assets/Images/user.jpg"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3" style={{ marginLeft: "20px" }}>
            <h6 className="mb-0">{username}</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <a href="#" className="nav-item nav-link active">
            <i className="fa fa-user-circle-o me-2"></i>Admin
          </a>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle-admin"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-lock me-2"></i>Account
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              {/* <a href="#" className="dropdown-item">
                  Account
                </a> */}
              <Link to="/admin/account" className="dropdown-item">
                Account
              </Link>
              <Link to="admin/account/create" className="dropdown-item">
                Account Add
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle-admin"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-sticky-note-o me-2"></i>Invoice
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <Link to="/admin/invoice" className="dropdown-item">
                Invoice
              </Link>
              <Link to="/admin/invoice/create" className="dropdown-item">
                Invoice Add
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle-admin"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-braille me-2"></i>Product Type
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <Link to="/admin/productType" className="dropdown-item">
                Product Type
              </Link>
              <Link to="/admin/productType/create" className="dropdown-item">
                Product Type Add
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle-admin"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-tasks me-2"></i>Combo
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <Link to="/admin/combo" className="dropdown-item">
                Combo
              </Link>
              <Link to="/admin/combo/create" className="dropdown-item">
                Combo Add
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle-admin"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-tasks me-2"></i>Product
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <Link to="/admin/product" className="dropdown-item">
                Product
              </Link>
              <Link to="/admin/product/create" className="dropdown-item">
                Product Add
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle-admin"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-ticket me-2"></i>Promotion
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <Link to="/admin/promotion" className="dropdown-item">
                Promotion
              </Link>
              <Link to="/admin/promotion/create" className="dropdown-item">
                Promotion Add
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle-admin"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-window-restore me-2"></i>Slideshow
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <Link to="/admin/slideshow" className="dropdown-item">
                Slideshow
              </Link>
              <Link to="/admin/slideshow/create" className="dropdown-item">
                Slideshow Add
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
