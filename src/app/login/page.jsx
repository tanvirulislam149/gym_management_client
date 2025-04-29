"use client";
import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import Button from "../../../components/Button/Button";
import { useLoginUserMutation } from "@/Redux/services/userApi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "@/Redux/features/userSlice";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loginUser, { isLoading, isSuccess, isError }] = useLoginUserMutation();

  const dispatch = useDispatch();
  const handleLogin = async () => {
    const result = await loginUser({ email, password });
    localStorage.setItem("token", result?.data?.access);
    axios
      .get("http://127.0.0.1:8000/auth/users/me/", {
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
      });
  };
  return (
    <div className={`${styles.container} flex justify-center items-center`}>
      <div
        className={`${styles.inputCont} w-full lg:w-3/6 h-96 flex justify-center`}
      >
        <div className="w-3/4">
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
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            className="input bg-white mt-1 w-full text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button>
            <input
              onClick={handleLogin}
              type="submit"
              disabled={isLoading}
              className="text-base"
              value={`${isLoading ? "Logging in..." : "Login"}`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default login;
