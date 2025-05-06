import Link from "next/link";
import React from "react";

const DashboardSidebar = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary text-black drawer-button lg:hidden m-4"
          >
            Dashboard Menu
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu pt-25 text-base lg:pt-4 bg-white lg:bg-transparent min-h-full text-black w-60 p-4">
            {/* Sidebar content here */}
            <li>
              <Link href={"/dashboard/create_plan"}>Create Plan</Link>
              <hr />
            </li>
            <li>
              <Link href={"/dashboard/manage_plan"}>Manage Plan</Link>
              <hr />
            </li>
            <li>
              <Link href={"/dashboard/create_classes"}>Create Classes</Link>
              <hr />
            </li>
            <li>
              <Link href={"/dashboard/manage_classes"}>Manage Classes</Link>
              <hr />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
