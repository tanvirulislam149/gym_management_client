import React from "react";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="lg:flex min-h-full">
      <div className="lg:bg-base-200">
        <DashboardSidebar />
      </div>
      <div className="p-3 lg:p-10 w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
