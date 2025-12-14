"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserInitial,
  getUser,
  removeUser,
} from "@/Redux/features/userSlice";
import { usePathname } from "next/navigation";
import Notification from "../Notification/Notification";
import Modal from "../Modal/Modal";
import ErrorModal from "../ErrorModal/ErrorModal";
import { FaDumbbell } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://gym-management-0fmi.onrender.com/auth/users/me/", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then((res) => {
          dispatch(getUser(res.data));
        })
        .catch((err) => {
          // document.getElementById("errorModal").showModal();
          console.log(err);
        });
    } else {
      dispatch(removeUser()); // makes the loading false
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(removeUser());
  };

  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="navbar shadow-sm py-3.5 lg:px-20 sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
      <div className="navbar-start w-6/12 sm:w-4/12">
        <Link href={"/"} className="font-bold text-xl sm:text-3xl">
          <div className="flex items-center">
            <FaDumbbell className="text-3xl text-green-500 mr-3" />
            <h1 className="text-2xl font-bold">
              Muscle<span className="text-green-500">Gain</span>
            </h1>
          </div>
        </Link>
      </div>
      {/*   -------------------------desktop view---------------------  */}
      <div className="navbar-center w-6/12 sm:w-8/12">
        <div className="hidden md:flex mx-auto items-center">
          <ul className="menu menu-horizontal px-1 py-0 flex items-center text-base">
            <li>
              <Link
                className={`hover:bg-transparent text-gray-300 hover:text-green-400 transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-green-500 hover:after:w-full after:transition-all after:duration-300`}
                href={"/"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`hover:bg-transparent text-gray-300 hover:text-green-400 transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-green-500 hover:after:w-full after:transition-all after:duration-300`}
                href={"/#plans"}
              >
                Plans
              </Link>
            </li>
            <li>
              <Link
                className={`hover:bg-transparent text-gray-300 hover:text-green-400 transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-green-500 hover:after:w-full after:transition-all after:duration-300`}
                href={"/#classes"}
              >
                Classes
              </Link>
            </li>
            <li>
              <Link
                className={`hover:bg-transparent text-gray-300 hover:text-green-400 transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-green-500 hover:after:w-full after:transition-all after:duration-300`}
                href={"/#contact"}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className={`hover:bg-transparent text-gray-300 hover:text-green-400 transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-green-500 hover:after:w-full after:transition-all after:duration-300`}
                href={"/about"}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <div className="mx-3">{user && <Notification />}</div>
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar w-13"
              >
                <div className="rounded-full border-3 border-green-400">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.image
                        ? user?.image
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white text-black rounded-box z-1 mt-3 min-w-60 p-2 my-14 shadow text-center text-base cursor-auto"
              >
                <div className="w-25 mt-2 rounded-full mx-auto">
                  <img
                    className="rounded-lg w-25"
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.image
                        ? user?.image
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                  />
                </div>
                <p className="my-2">{user.email}</p>
                <Link
                  className="bg-gray-200 py-2 my-1"
                  href="/dashboard/my_profile"
                >
                  Profile
                </Link>
                <Link
                  className="bg-gray-200 py-2 my-1"
                  href={
                    user?.is_staff
                      ? "/dashboard/summary"
                      : "/dashboard/my_plans"
                  }
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn bg-green-400 my-1 text-black border-0 w-full text-base"
                >
                  Log out
                </button>
              </ul>
            </div>
          </>
        ) : (
          <Link className="btn bg-green-400 text-black mx-2" href={"/login"}>
            Login
          </Link>
        )}
        {/* -----------------Mobile view----------------  */}
        <div className="md:hidden">{user && <Notification />}</div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-32 items-center p-2 shadow"
          >
            <li>
              <Link className={pathname === "/" ? "border-b-1" : ""} href={"/"}>
                Home
              </Link>
            </li>
            <li className="my-1 text-5xl">
              <Link href={"/#plans"}>Plans</Link>
            </li>
            <li className="my-1 text-5xl">
              <Link href={"/#classes"}>Classes</Link>
            </li>
            <li>
              <Link href={"/#contact"}>Contact</Link>
            </li>
            <li>
              <Link
                className={pathname === "about" ? "border-b-1" : ""}
                href={"/about"}
              >
                About
              </Link>
            </li>
            <li className="my-1 text-5xl">
              {user ? (
                <>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src={
                            user?.image
                              ? user?.image
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-white text-black rounded-box z-1 mt-3 min-w-60 p-2 my-14 shadow text-center text-base cursor-auto"
                    >
                      <div className="w-15 mt-2 rounded-full mx-auto">
                        <img
                          className="rounded-full"
                          alt="Tailwind CSS Navbar component"
                          src={
                            user?.image
                              ? user?.image
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                      </div>
                      <p className="my-2">{user.email}</p>
                      <Link
                        className="bg-gray-200 py-2 my-1"
                        href="/dashboard/my_profile"
                      >
                        Profile
                      </Link>
                      <Link
                        className="bg-gray-200 py-2 my-1"
                        href={
                          user?.is_staff
                            ? "/dashboard/summary"
                            : "/dashboard/my_plans"
                        }
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="btn bg-green-400 my-1 text-black border-0 w-full text-base"
                      >
                        Log out
                      </button>
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  className="btn bg-green-400 text-black mx-2"
                  href={"/login"}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <ErrorModal />
    </div>
  );
};

export default Navbar;
