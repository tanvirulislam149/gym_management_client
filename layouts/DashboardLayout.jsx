import React from "react";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="lg:flex min-h-full">
      <div className="lg:bg-green-400">
        <DashboardSidebar />
      </div>
      <div className="m-5 w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
