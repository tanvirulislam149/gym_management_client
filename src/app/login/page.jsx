"use client";
import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import Button from "../../../components/Button/Button";
import { useLoginUserMutation } from "@/Redux/services/userApi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "@/Redux/features/userSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Modal from "../../../components/Modal/Modal";
import api_client from "@/api_client";
import ErrorModal from "../../../components/ErrorModal/ErrorModal";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const router = useRouter();
  const [loginUser] = useLoginUserMutation();

  const dispatch = useDispatch();
  const handleLogin = async () => {
    setLoading(true);
    const result = await loginUser({ email, password });
    localStorage.setItem("token", result?.data?.access);
    axios
      .get("https://gym-management-henna.vercel.app/auth/users/me/", {
        headers: {
          Authorization: `JWT ${result?.data?.access}`,
        },
      })
      .then((res) => {
        dispatch(getUser(res.data));
        router.push("/");
      })
      .catch((err) => {
        if (err.status === 401) {
          setMsg("Wrong Password");
          document.getElementById(`my_modal_3`).showModal();
        }
      })
      .finally(() => setLoading(false));
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://gym-management-henna.vercel.app/auth/users/reset_password/",
        {
          email: e.target.email.value,
        }
      )
      .then((res) => {
        if (res.status === 204) {
          setMsg("Email Sent. Please check your email.");
          document.getElementById(`my_modal_3`).showModal();
        }
      })
      .catch((err) => document.getElementById("errorModal").showModal());
  };

  return (
    <div className={`${styles.container} flex justify-center items-center`}>
      <div
        className={`${styles.inputCont} w-full m-2 lg:w-3/6 flex justify-center`}
      >
        <div className="w-full m-4 lg:w-3/4">
          <p className="text-3xl my-5 mb-5 text-center">LOGIN</p>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            type="email"
            name="email"
            value={email}
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="input bg-white mt-1 mb-3 w-full text-black"
          />
          <label htmlFor="password">Password</label>
          <br />
          <div className="flex justify-center items-center relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={password}
              required
              placeholder="Enter your password"
              className="input bg-white mt-1 w-full text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPass ? (
              <FaRegEyeSlash
                onClick={() => setShowPass(false)}
                className="w-6 h-6 absolute top-2.5 right-2.5 z-10"
              />
            ) : (
              <FaRegEye
                onClick={() => setShowPass(true)}
                className="w-6 h-6 absolute top-2.5 right-2.5 z-10"
              />
            )}
          </div>
          <div className="flex justify-between">
            <button
              className="underline cursor-pointer"
              onClick={() => {
                document.getElementById(`forgot_pass`).showModal();
              }}
            >
              Forgot Password?
            </button>{" "}
            <Link className="pt-2 underline" href={"/register"}>
              Go to Register
            </Link>{" "}
          </div>
          <input
            onClick={handleLogin}
            type="submit"
            disabled={loading}
            className="text-base btn bg-green-400 hover:bg-white my-3 text-black border-none"
            value={`${loading ? "Logging in..." : "Login"}`}
          />
          <div className="mb-4">
            <button
              onClick={() => {
                setEmail("tanvirulislam149@gmail.com");
                setPassword("asdfasdf12");
              }}
              className="btn bg-white text-black border-none mr-3"
            >
              User credentials
            </button>
            <button
              onClick={() => {
                setEmail("admin@gmail.com");
                setPassword("admin");
              }}
              className="btn bg-white text-black border-none"
            >
              Admin credentials
            </button>
          </div>
        </div>
      </div>
      <Modal text={msg} />
      <dialog id="forgot_pass" className="modal">
        <div className="modal-box bg-white text-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="mb-2">Enter your email:</p>
          <form onSubmit={(e) => handleSendEmail(e)}>
            <input
              type="email"
              name="email"
              id=""
              required
              placeholder="Enter email"
              className="input bg-white border border-black text-black mb-3"
            />{" "}
            <br />
            <input
              type="submit"
              className="btn btn-primary text-black"
              value="Send Email"
            />
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <ErrorModal />
    </div>
  );
};

export default login;
