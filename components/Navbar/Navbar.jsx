"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserInitial,
  getUser,
  removeUser,
} from "@/Redux/features/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserInitial());
      axios
        .get("https://gym-management-henna.vercel.app/auth/users/me/", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then((res) => {
          dispatch(getUser(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(removeUser());
  };

  const user = useSelector((state) => state?.user?.user);
  return (
    <div className="navbar bg-base-100 shadow-sm py-5 md:px-20 z-10 sticky top-0 border-b-1 border-green-400">
      <div className="navbar-start">
        <Link
          href={"/"}
          className="font-bold text-xl text-green-400 sm:text-3xl"
        >
          Muscle Gain
        </Link>
      </div>
      {/*   -------------------------desktop view---------------------  */}
      <div className="navbar-end">
        <div className="hidden sm:flex items-center">
          <ul className="menu menu-horizontal px-1 py-0 flex items-center text-base">
            <li>
              <Link href={"/#plans"}>Plans</Link>
            </li>
            <li>
              <Link href={"/#classes"}>Classes</Link>
            </li>
            {user && (
              <li>
                <Link
                  href={
                    user?.is_staff
                      ? "/dashboard/schedule_classes"
                      : "/dashboard/my_plans"
                  }
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              {!user ? (
                <Link
                  className="btn bg-green-400 text-black mx-2"
                  href={"/register"}
                >
                  Register
                </Link>
              ) : (
                ""
              )}
            </li>
            <li>
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
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-white text-black rounded-box z-1 mt-3 w-52 p-2 shadow text-center"
                    >
                      <p className="my-3">{user.email}</p>
                      <button
                        onClick={handleLogout}
                        className="btn bg-green-400 text-black mx-3 border-0"
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
        {/* -----------------Mobile view----------------  */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
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
              <Link href={"/#plans"}>Plans</Link>
            </li>
            <li>
              <Link href={"/#classes"}>Classes</Link>
            </li>
            {user && (
              <li>
                <Link
                  href={
                    user?.is_staff
                      ? "/dashboard/schedule_classes"
                      : "/dashboard/my_plans"
                  }
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn bg-green-400 text-black mx-3"
                >
                  Log out
                </button>
              ) : (
                <Link href={"/login"}>Login</Link>
              )}
            </li>
            <img
              className="w-10 rounded-full my-2"
              alt="Tailwind CSS Navbar component"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
