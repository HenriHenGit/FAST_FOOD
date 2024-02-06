import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Index = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <Sidebar className="Sidebar-admin" value={isSidebarOpen} />

      <div className={`content-admin ${isSidebarOpen ? "open-admin" : ""}`}>
        <Navbar className="Navbar-admin" fcToggleSidebar={toggleSidebar} />
        <div className="content-admin">{children}</div>
      </div>
    </div>
  );
};

export default Index;
