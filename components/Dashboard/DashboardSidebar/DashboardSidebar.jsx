"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const DashboardSidebar = () => {
  const { user, loading } = useSelector((state) => state?.user);
  const pathname = usePathname();
  console.log(pathname);
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
          <ul className="menu pt-25 text-base lg:pt-4 lg:bg-transparent bg-base-200 min-h-full text-white w-70 p-4">
            {/* Sidebar content here */}
            {user.is_staff ? (
              <>
                <li>
                  <Link
                    className={
                      pathname === "/dashboard/summary"
                        ? "bg-white text-black"
                        : "border-b-2 border-white py-2 my-2"
                    }
                    href={"/dashboard/summary"}
                  >
                    Summary
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname === "/dashboard/schedule_classes"
                        ? "bg-white text-black"
                        : "border-b-2 border-white py-2 my-2"
                    }
                    href={"/dashboard/schedule_classes"}
                  >
                    Schedule Classes
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname === "/dashboard/create_plan"
                        ? "bg-white text-black"
                        : "border-b-2 border-white py-2 my-2"
                    }
                    href={"/dashboard/create_plan"}
                  >
                    Create Plan
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname === "/dashboard/manage_plan"
                        ? "bg-white text-black"
                        : "border-b-2 border-white py-2 my-2"
                    }
                    href={"/dashboard/manage_plan"}
                  >
                    Manage Plan
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname === "/dashboard/create_classes"
                        ? "bg-white text-black"
                        : "border-b-2 border-white py-2 my-2"
                    }
                    href={"/dashboard/create_classes"}
                  >
                    Create Classes
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname === "/dashboard/manage_classes"
                        ? "bg-white text-black"
                        : "border-b-2 border-white py-2 my-2"
                    }
                    href={"/dashboard/manage_classes"}
                  >
                    Manage Classes
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className={
                      pathname === "/dashboard/my_plans"
                        ? "bg-white text-black"
                        : "border-b-2 border-white py-2 my-2"
                    }
                    href={"/dashboard/my_plans"}
                  >
                    My Plan
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname === "/dashboard/my_classes"
                        ? "bg-white text-black"
                        : "border-b-2 border-white py-2 my-2"
                    }
                    href={"/dashboard/my_classes"}
                  >
                    My Classes
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname === "/dashboard/book_class"
                        ? "bg-white text-black"
                        : "border-b-2 border-white py-2 my-2"
                    }
                    href={"/dashboard/book_class"}
                  >
                    Book Class
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                className={
                  pathname === "/dashboard/my_profile"
                    ? "bg-white text-black"
                    : "border-b-2 border-white py-2 my-2"
                }
                href={"/dashboard/my_profile"}
              >
                My Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
