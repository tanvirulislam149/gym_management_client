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

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

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
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className={`${styles.container} flex justify-center items-center`}>
      <div
        className={`${styles.inputCont} w-full m-2 lg:w-3/6 h-96 flex justify-center`}
      >
        <div className="w-full m-4 lg:w-3/4">
          <p className="text-3xl my-5 mb-5 text-center">LOGIN</p>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            type="email"
            name="email"
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
          <div className="text-right">
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
        </div>
      </div>
    </div>
  );
};

export default login;
