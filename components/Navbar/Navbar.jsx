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

const Navbar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const socketRef = useRef(null);

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
  useEffect(() => {
    if (user) {
      socketRef.current = new WebSocket(
        `ws://127.0.0.1:8000/ws/notifications/public/`
      );
      socketRef.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
      };

      return () => socketRef.current.close();
    }
  }, [user]);
  console.log(user);
  return (
    <div className="navbar bg-base-100 shadow-sm py-5 lg:px-20 z-10 sticky top-0 border-b-1 border-green-400">
      <div className="navbar-start w-4/12">
        <Link
          href={"/"}
          className="font-bold text-xl text-green-400 sm:text-3xl"
        >
          Muscle Gain
        </Link>
      </div>
      {/*   -------------------------desktop view---------------------  */}
      <div className="navbar-end w-8/12">
        <div className="hidden sm:flex items-center">
          <ul className="menu menu-horizontal px-1 py-0 flex items-center text-base">
            <li>
              <Link className={pathname === "/" ? "border-b-1" : ""} href={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/#plans"}>Plans</Link>
            </li>
            <li>
              <Link href={"/#classes"}>Classes</Link>
            </li>
            <li>
              <Link href={"/#contact"}>Contact</Link>
            </li>
            <li>
              <Link
                className={pathname === "/about" ? "border-b-1" : ""}
                href={"/about"}
              >
                About
              </Link>
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
    </div>
  );
};

export default Navbar;
